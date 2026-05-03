import { type Lexeme, type TokenCtx, tokenize } from '@@/lib/parser/model/tokenizer.ts'



export interface AnyNode { 
  up: Node | undefined
}

export interface TypeNode extends AnyNode {
  nodeType: 'Operation' | 'Value' | 'FieldName'
}

export type OpType =
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
  // Values
  | 'number'
  | 'string'
  // Field name
  | 'fieldName'

export interface NodeOpType { type: OpType }

export interface NodePrecedence { lPrec: number, rPrec: number }

export interface LNodeArg { argType: 'l', left?: Node | undefined }
export interface RNodeArg { argType: 'r', right?: Node | undefined }
export interface LRNodeArg { argType: 'lr', left?: Node | undefined, right?: Node | undefined }
export interface VNodeArg { argType: 'v', value: any }
export interface FNodeArg { argType: 'f', field: string }
export type NodeArg = VNodeArg | FNodeArg | LNodeArg | RNodeArg | LRNodeArg

export function hasNoR<T extends NodeArg>(node: T): node is T & (LNodeArg | VNodeArg | FNodeArg) {
  return node.argType === 'l' || node.argType === 'v' || node.argType === 'f'
}


export type NodeCtxType =
  | ''
  | 'LPAREN'
  | 'LDQUOTE'
  | 'CHAIN'
  | 'IDF'

export interface InCtxNode { inCtx: NodeCtxType[] }

export interface StartCtxNode { startCtx?: NodeCtxType | undefined, endCtxNode?: Node | undefined }
export interface EndCtxNode { endCtx?: NodeCtxType[] | undefined, startCtxNode?: Node | undefined }

export type CtxNode = StartCtxNode & EndCtxNode

export type NodeCtx = InCtxNode & CtxNode


export type Node = TypeNode & NodeOpType & NodePrecedence & NodeArg & NodeCtx


// Контекст - требуется там,
// где есть явный оператор открытия и явный оператор закрытия: () ""
// Приоритет - работает внутри контекста,
// когда 2 оператора хотят одно значение в качестве аргумента: ... or value and ...
// Тип ноды аргумента - оператор может иметь

// Node
const anyNode: AnyNode = { up: undefined }

// Node types
const opNode: TypeNode = { ...anyNode, nodeType: 'Operation' }
const valNode: TypeNode = { ...anyNode, nodeType: 'Value' }
const fieldNameNode: TypeNode = { ...anyNode, nodeType: 'FieldName' }

// Contexts
const defCtx: NodeCtx = { inCtx: ['', 'LPAREN', 'CHAIN'] }
const lparenCtx: NodeCtx = { ...defCtx, startCtx: 'LPAREN'  }
const rparenCtx: NodeCtx = { inCtx: ['LPAREN'], endCtx: 'LPAREN' }
const ldquoteCtx: NodeCtx = { ...defCtx, startCtx: 'LDQUOTE' }
const rdquoteCtx: NodeCtx = { inCtx: ['LDQUOTE'], endCtx: 'LDQUOTE' }
const stringCtx: NodeCtx = { inCtx: ['LDQUOTE'] }
const chainCtx: NodeCtx = { ...defCtx, startCtx: 'CHAIN' }
const idfCtx: NodeCtx = { ...defCtx, startCtx: 'IDF' }


// Precedence
const exprPrec: NodePrecedence = { lPrec: 0, rPrec: 0 }
const rparenPrec: NodePrecedence = { lPrec: 1, rPrec: 6 }
const lparenPrec: NodePrecedence = { lPrec: 6, rPrec: 2 }
const orPrec: NodePrecedence = { lPrec: 2, rPrec: 2 }
const andPrec: NodePrecedence = { lPrec: 3, rPrec: 3 }
const comparisonPrec: NodePrecedence = { lPrec: 4, rPrec: 4 }
const dotPrec: NodePrecedence = { lPrec: 5, rPrec: 5 }
const valuePrec: NodePrecedence = { lPrec: 6, rPrec: 6 }

// Arguments
const rArg: RNodeArg = { argType: 'r' }
const lArg: LNodeArg = { argType: 'l' }
const lrArg: LRNodeArg = { argType: 'lr' }
const vArg: (value: any) => VNodeArg = (value: any) => ({ argType: 'v', value })
const fArg: (field: string) => FNodeArg = (field: string) => ({ argType: 'f', field })

// Nodes
const newOrNode = (): Node => ({
  ...opNode, type: 'or', ...orPrec, ...lrArg, ...defCtx,
})
const newAndNode = (): Node => ({
  ...opNode, type: 'and', ...andPrec, ...lrArg, ...defCtx,
})
const newDotNode = (): Node => ({
  ...opNode, type: 'dot', ...dotPrec, ...lrArg,
})
const newEqNode = (): Node => ({
  ...opNode, type: 'eq', ...comparisonPrec, ...lrArg,
})
const newNeqNode = (): Node => ({
  ...opNode, type: 'neq', ...comparisonPrec, ...lrArg,
})
const newGtNode = (): Node => ({
  ...opNode, type: 'gt', ...comparisonPrec, ...lrArg,
})
const newLtNode = (): Node => ({
  ...opNode, type: 'lt', ...comparisonPrec, ...lrArg,
})
const newGteNode = (): Node => ({
  ...opNode, type: 'gte', ...comparisonPrec, ...lrArg,
})
const newLteNode = (): Node => ({
  ...opNode, type: 'lte', ...comparisonPrec, ...lrArg,
})
//const newLDQuoteNode = (): Node => ({ ...opNode, type: 'ldquote', ...valuePrec, ...rArg })
//const newRDQuoteNode = (): Node => ({ ...opNode, type: 'rdquote', ...valuePrec, ...lArg })
const newLParenNode = (): Node => ({
  ...opNode, type: 'lparen', ...lparenPrec, ...rArg,
})
const newRParenNode = (): Node => ({
  ...opNode, type: 'rparen', ...rparenPrec, ...lArg,
})
const newIdfNode = (field: string): Node =>  ({
  ...fieldNameNode, type: 'fieldName', ...fArg(field), ...valuePrec,
})
const newStringNode = (value: string): Node => ({
  ...valNode, type: 'string', ...vArg(value), ...valuePrec,
})
const newNumberNode = (value: number): Node => ({
  ...valNode, type: 'number', ...vArg(value), ...valuePrec,
})
//const newSpaceNode = (value: string): Node => ({ ...valNode, value, ...valuePrec })
const newExprNode = (): Node => ({
  ...opNode, type: 'expression', ...exprPrec, ...rArg,
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
        
        // Поднимаем текущую ноду наверх если приоритет меньше.
        // Ноды с самым высоким приоритетом являются листьями дерева AST.
        let toDown: Node | undefined = prev
        while (true) {
          if (!toDown) throw new Error(`This is unreachable`)
          if (toDown.rPrec <= curr.lPrec) break
          
          const up: Node | undefined = toDown.up
          if (!up) throw new Error(`This is unreachable`)
          if (hasNoR(up)) throw new Error(`This is unreachable`)
          
          const down = curr.left
          if (down) {
            if (hasNoR(toDown)) throw new Error(`This is unreachable`)
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
