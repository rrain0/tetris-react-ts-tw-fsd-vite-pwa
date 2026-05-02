import { type Lexeme, tokenize, } from '@@/lib/parser/model/tokenizer.ts'



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
  leftPrec: number
  rightPrec: number
  left?: Node | undefined
  right?: Node | undefined
}
export interface ValueNode {
  up: Node | undefined
  nodeType: 'Value'
  type:
    | 'number'
    | 'string'
  leftPrec: number
  rightPrec: number
  value: any
}
export interface FieldNameNode {
  up: Node | undefined
  nodeType: 'FieldName'
  type:
    | 'fieldName'
  leftPrec: number
  rightPrec: number
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
const exprPrec = { leftPrec: 0, rightPrec: 0 }
const rparenPrec = { leftPrec: 1, rightPrec: 6 }
const lparenPrec = { leftPrec: 6, rightPrec: 2 }
const orPrec = { leftPrec: 2, rightPrec: 2 }
const andPrec = { leftPrec: 3, rightPrec: 3 }
const comparisonPrec = { leftPrec: 4, rightPrec: 4 }
const dotPrec = { leftPrec: 5, rightPrec: 5 }
const valuePrec = { leftPrec: 6, rightPrec: 6 }

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
  ...opNode, type: 'lparen', ...lparenPrec, ...rightArg,
})
const newRParenNode = (): Node => ({
  ...opNode, type: 'rparen', ...rparenPrec, ...leftArg,
})
const newIdfNode = (field: string): Node =>  ({
  ...fieldNameNode, type: 'fieldName', field, ...valuePrec,
})
const newStringNode = (value: string): Node => ({
  ...valNode, type: 'string', value, ...valuePrec,
})
const newNumberNode = (value: number): Node => ({
  ...valNode, type: 'number', value, ...valuePrec,
})
//const newSpaceNode = (value: string): Node => ({ ...valNode, value, ...valuePrec })
const newExprNode = (): Node => ({
  ...opNode, type: 'expression', ...exprPrec, ...rightArg,
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
    else if (t === 'RPAREN') curr = newRParenNode()
    else if (t === 'IDENTIFIER') curr = newIdfNode(lexeme.value)
    else if (t === 'STRING') curr = newStringNode(lexeme.value)
    else if (t === 'NUMBER') curr = newNumberNode(+lexeme.value)
    //else if (t === 'SPACE') { /* Just skip it */ }
    
    if (curr) {
      console.log('prev', prev)
      console.log('curr', curr)
      if ('right' in prev && 'left' in curr) {
        throw new Error(`Left and right nodes need each other as arguments`)
      }
      if (!('right' in prev) && !('left' in curr)) {
        throw new Error(`Left and right nodes don't need each other as arguments`)
      }
      if ('right' in prev && !('left' in curr)) {
        prev.right = curr
        curr.up = prev
      }
      if (!('right' in prev) && 'left' in curr) {
        
        // Между () ничего нет
        if (prev.type === 'lparen' && curr.type === 'rparen') {
          throw new Error(`Empty parentheses`)
        }
        
        let toDown = prev
        while (true) {
          if (!toDown) throw new Error(`This is unreachable`)
          if (toDown.rightPrec <= curr.leftPrec) break
          
          const up = toDown.up
          if (!up) throw new Error(`This is unreachable`)
          if (!('right' in up)) throw new Error(`This is unreachable`)
          
          const down = curr.left
          if (down) {
            if (!('right' in toDown)) throw new Error(`This is unreachable`)
            down.up = toDown
            toDown.right = down
          }
          
          curr.left = toDown
          toDown.up = curr
          
          curr.up = up
          up.right = curr
          
          toDown = up
        }
        if (curr.type === 'rparen' && curr.left?.type !== 'lparen') {
          throw new Error(`Unopened right parenthesis`)
        }
      }
      prev = curr
    }
    
  }
  
  return root
}


export function parserTest() {
  const inputs = [
    'event.type="click"',
    'timestamp>100',
    'value=3.14',
    'a=1.', // ?????
    //'=', '!=', '>', '<', '>=', '<=',
    'a=1 AND b=2 OR c=3',
    'a=1 and b=2 or c=3',
    '(a=1)and 4',
    //'a="hello',
    //'a@b',
    '  a  =  1  ',
  ]
  inputs.slice(6, 7).forEach(it => {
    try {
      console.log('input:', it)
      const lexemes = tokenize(it)
      const nodes = parse(lexemes)
      console.log('nodes', nodes)
    }
    catch (err) {
      console.error(err)
    }
  })
}
