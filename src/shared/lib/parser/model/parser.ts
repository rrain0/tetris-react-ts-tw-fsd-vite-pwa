import type { Lexeme, TokenType } from '@@/lib/parser/model/tokenizer.ts'


/*
export interface FieldPathNode {
  up?: Node | undefined
  type: 'FieldPath'
  path: string[]
}
export interface LogicalNode {
  up?: Node | undefined
  type: 'Logical'
  operation: 'and' | 'or'
  arg1: Node
  arg2: Node
}
export interface ComparisonNode {
  up?: Node | undefined
  type: 'Comparison'
  operation: 'eq' | 'neq' | 'lt' | 'gt' | 'lte' | 'gte'
  arg1: Node
  arg2: Node
}
export interface NumberValueNode {
  up?: Node | undefined
  type: 'NumberValue'
  value: number
}
export interface StringValueNode {
  up?: Node | undefined
  type: 'StringValue'
  value: string
}
export interface BooleanValueNode {
  up?: Node | undefined
  type: 'BooleanValue'
  value: boolean
}
export type ValueNode = FieldPathNode | NumberValueNode | StringValueNode | BooleanValueNode
export type Node = ValueNode | LogicalNode | ComparisonNode
*/

export interface OperationNode {
  up: Node | undefined
  nodeType: 'Operation'
  type:
    | 'or'
    | 'and'
    | 'dot'
    | 'eq'
    | 'neq'
    | 'gt'
    | 'lt'
    | 'gte'
    | 'lte'
    | 'lparen'
    | 'rparen'
    | 'expression'
  precedence: number
  left?: Node | undefined
  right?: Node | undefined
}
export interface ValueNode {
  up: Node | undefined
  nodeType: 'Value'
  type:
    | 'number'
    | 'string'
  precedence: number
  value: any
}
export interface FieldNameNode {
  up: Node | undefined
  nodeType: 'FieldName'
  type:
    | 'fieldName'
  precedence: number
  field: string
}
export type Node = OperationNode | ValueNode | FieldNameNode

// Node
const anyNode = { up: undefined }

// Node Type
const opNode = { ...anyNode, nodeType: 'Operation' as const }
const valNode = { ...anyNode, nodeType: 'Value' as const }
const fieldNameNode = { ...anyNode, nodeType: 'FieldName' as const }

// Precedence
const orPrec = { precedence: 1 }
const andPrec = { precedence: 2 }
const comparisonPrec = { precedence: 3 }
const dotPrec = { precedence: 4 }
const valuePrec = { precedence: 5 }

// Arguments
const rightArg = { right: undefined }
const leftArg = { left: undefined }
const leftRightArgs = { left: undefined, right: undefined }


const newOrNode = (): Node => ({
  ...opNode, type: 'or', ...orPrec, ...leftRightArgs,
})
const newAndNode = (): Node => ({
  ...opNode, type: 'and', ...andPrec, ...leftRightArgs,
})
const newDotNode = (): Node => ({
  ...opNode, type: 'dot', ...dotPrec, ...leftRightArgs,
})
const newEqNode = (): Node => ({
  ...opNode, type: 'eq', ...comparisonPrec, ...leftRightArgs,
})
const newNeqNode = (): Node => ({
  ...opNode, type: 'neq', ...comparisonPrec, ...leftRightArgs,
})
const newGtNode = (): Node => ({
  ...opNode, type: 'gt', ...comparisonPrec, ...leftRightArgs,
})
const newLtNode = (): Node => ({
  ...opNode, type: 'lt', ...comparisonPrec, ...leftRightArgs,
})
const newGteNode = (): Node => ({
  ...opNode, type: 'gte', ...comparisonPrec, ...leftRightArgs,
})
const newLteNode = (): Node => ({
  ...opNode, type: 'lte', ...comparisonPrec, ...leftRightArgs,
})
//const newLDQuoteNode = (): Node => ({ ...opNode, type: 'ldquote', ...valuePrec, ...rightArg })
//const newRDQuoteNode = (): Node => ({ ...opNode, type: 'rdquote', ...valuePrec, ...leftArg })
const newLParenNode = (): Node => ({
  ...opNode, type: 'lparen', ...valuePrec, ...rightArg,
})
const newRParenNode = (): Node => ({
  ...opNode, type: 'rparen', ...valuePrec, ...leftArg,
})
const newIdfNode = (field: string): Node =>  ({
  ...fieldNameNode, type: 'fieldName', field, ...valuePrec,
})
const newStringNode = (value: string): Node => ({
  ...valNode, type: 'number', value, ...valuePrec,
})
const newNumberNode = (value: number): Node => ({
  ...valNode, type: 'string', value, ...valuePrec,
})
//const newSpaceNode = (value: string): Node => ({ ...valNode, value, ...valuePrec })
const newExprNode = (): Node => ({
  ...opNode, type: 'expression', ...valuePrec, ...rightArg,
})



export function parse(lexemes: Lexeme[]): Node {
  const root: Node = newExprNode()
  
  let prev = root
  for (let i = 0; i < lexemes.length; i++) {
    const lexeme = lexemes[i]
    const { type: t } = lexeme.token
    
    let curr: Node | undefined
    if (t === 'OR') curr = newOrNode()
    else if (t === 'AND') curr = newAndNode()
    else if (t === 'DOT') curr = newDotNode()
    else if (t === 'EQ') curr = newEqNode()
    else if (t === 'NEQ') curr = newNeqNode()
    else if (t === 'GT') curr = newGtNode()
    else if (t === 'LT') curr = newLtNode()
    else if (t === 'GTE') curr = newGteNode()
    else if (t === 'LTE') curr = newLteNode()
    //else if (t === 'LDQUOTE') { /* Just skip it */ }
    //else if (t === 'RDQUOTE') { /* Just skip it */ }
    else if (t === 'LPAREN') curr = newLParenNode()
    else if (t === 'RPAREN') {
      curr = newRParenNode()
      // Go back to 'lparen'
      // Case '()'
      if (prev.type === 'lparen') {
        throw new Error(`Empty parentheses`)
      }
      let up = prev.up
      while (true) {
        if (!up) {
          throw new Error(`Unopened right parenthesis`)
        }
        if (up.type === 'lparen') { prev = up; break }
        up = up.up
      }
    }
    else if (t === 'IDENTIFIER') curr = newIdfNode(lexeme.value)
    else if (t === 'STRING') curr = newStringNode(lexeme.value)
    else if (t === 'NUMBER') curr = newNumberNode(+lexeme.value)
    //else if (t === 'SPACE') { /* Just skip it */ }
    
    if (curr) {
      if ('right' in prev && 'left' in curr) {
        throw new Error(`Left and right nodes need each other as arguments`)
      }
      if (!('right' in prev) && !('left' in curr)) {
        throw new Error(`Left and right nodes don't need each other as arguments`)
      }
      if ('right' in prev && !('left' in curr)) {
        prev.right = curr
      }
      if (!('right' in prev) && 'left' in curr) {
        if (prev.type === 'lparen' && curr.type === 'rparen') {
          throw new Error(`Empty parentheses`)
        }
        let up = prev.up
        while (true) {
          if (!up) throw new Error(`This is unreachable`)
          if (curr.precedence < up.precedence) {
            const up2 = up.up
            if (!up2) throw new Error(`This is unreachable`)
            if ('right' in up2) {
              curr.left = up
              curr.up = up2
              up2.right = curr
              up = up2
            }
            else throw new Error(`This is unreachable`)
          }
          else break
        }
      }
    }
    
  }
  
  return root
}