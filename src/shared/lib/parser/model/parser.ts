import {
  type Lexeme, type TokenCtxType,
  tokenize, type TokenType,
} from '@@/lib/parser/model/tokenizer.ts'




// 1) Требуемые аргументы на позициях справа и слева -
// если ноды требуют друг друга в качестве аргументов, то это синтаксическая ошибка ввода
// 2) Контекст - требуется там,
// где есть явный оператор открытия и явный оператор закрытия: () ""
// 3) Приоритет - работает внутри контекста,
// когда 2 оператора хотят одно значение в качестве аргумента: ... or value and ...
// 4) Тип ноды аргумента - оператор может иметь ограничкения по результирующему типу ноды.



export type NodeArgType =
  | 'value' // самостоятельно вычисляемое значение
  | 'idf' // указатель на значение извне
  | 'string' // знаечние строкового литерала

export type NodeForType =
  | 'consumer' // проверяемая нода для текущей ноды является аргументом
  | NodeArgType

export interface NodeInTree {
  forNearL: NodeForType // чем является нода для ноды, которая физически в строке справа
  forNearR: NodeForType // чем является нода для ноды, которая физически в строке слева
  forLPrec: number // приоритет для ноды слева
  forRPrec: number // приоритет для ноды справа
  needL?: NodeArgType[] | undefined // что нужно ноде в качестве аргумента справа
  needR?: NodeArgType[] | undefined // что нужно ноде в качестве аргумента слева
}


/*
export function hasNoR<T extends NodeArg>(node: T): node is T & (LNodeArg | VNodeArg | FNodeArg) {
  return node.argType === 'l' || node.argType === 'v' || node.argType === 'f'
}
*/


export type NodeCtxType =
  | ''
  | 'LPAREN'
  | 'LDQUOTE'

export interface NodeInCtx { inCtx: NodeCtxType[] }

export interface NodeDefineCtx {
  startCtx?: NodeCtxType | undefined
  endCtx?: NodeCtxType | undefined
}

export type NodeCtx = NodeInCtx & NodeDefineCtx



export type NodeOpType =
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
  | 'ldquote'
  | 'rdquote'
  | 'expression'
  // Values
  | 'string'
  | 'number'
  | 'space'
  // Variable or field name
  | 'idf'

export interface NodeOp { type: NodeOpType }



export type Node = NodeInTree & NodeCtx & NodeOp



// Node tree params
const exprInT: NodeInTree = {
  forNearL: 'value', forNearR: 'value',
  forLPrec: 0, forRPrec: 0,
  needR: ['value', 'idf'],
}
const lparenInT: NodeInTree = {
  forNearL: 'value', forNearR: 'consumer',
  forLPrec: 6, forRPrec: 1,
  needR: ['value', 'idf'],
}
const rparenInT: NodeInTree = {
  forNearL: 'consumer', forNearR: 'value',
  forLPrec: 1, forRPrec: 6,
  needL: ['value', 'idf'],
}
const ldquoteInT: NodeInTree = {
  forNearL: 'value', forNearR: 'consumer',
  forLPrec: 6, forRPrec: 1,
  needR: ['string'],
}
const rdquoteInT: NodeInTree = {
  forNearL: 'consumer', forNearR: 'value',
  forLPrec: 1, forRPrec: 6,
  needL: ['string'],
}
const orInT: NodeInTree = {
  forNearL: 'consumer', forNearR: 'consumer',
  forLPrec: 2, forRPrec: 2,
  needL: ['value', 'idf'], needR: ['value', 'idf'],
}
const andInT: NodeInTree = {
  forNearL: 'consumer', forNearR: 'consumer',
  forLPrec: 3, forRPrec: 3,
  needL: ['value', 'idf'], needR: ['value', 'idf'],
}
const compInT: NodeInTree = {
  forNearL: 'consumer', forNearR: 'consumer',
  forLPrec: 4, forRPrec: 4,
  needL: ['value', 'idf'], needR: ['value', 'idf'],
}
const dotInT: NodeInTree = {
  forNearL: 'consumer', forNearR: 'consumer',
  forLPrec: 5, forRPrec: 5,
  needL: ['idf'], needR: ['idf'],
}
const valInT: NodeInTree = {
  forNearL: 'value', forNearR: 'value',
  forLPrec: 6, forRPrec: 6,
}
const idfInT: NodeInTree = {
  forNearL: 'idf', forNearR: 'idf',
  forLPrec: 6, forRPrec: 6,
}



// Contexts
const defCtx: NodeCtx = { inCtx: ['', 'LPAREN'] }
const exprCtx: NodeCtx = { ...defCtx, startCtx: '' }
const lparenCtx: NodeCtx = { ...defCtx, startCtx: 'LPAREN'  }
const rparenCtx: NodeCtx = { inCtx: ['LPAREN'], endCtx: 'LPAREN' }
const ldquoteCtx: NodeCtx = { ...defCtx, startCtx: 'LDQUOTE' }
const rdquoteCtx: NodeCtx = { inCtx: ['LDQUOTE'], endCtx: 'LDQUOTE' }
const stringCtx: NodeCtx = { inCtx: ['LDQUOTE'] }



export const orNode: Node = { type: 'or', ...orInT, ...defCtx }
export const andNode: Node = { type: 'and', ...andInT, ...defCtx }
export const dotNode: Node = { type: 'dot', ...dotInT, ...defCtx }
export const eqNode: Node = { type: 'eq', ...compInT, ...defCtx }
export const neqNode: Node = { type: 'neq', ...compInT, ...defCtx }
export const gtNode: Node = { type: 'gt', ...compInT, ...defCtx }
export const ltNode: Node = { type: 'lt', ...compInT, ...defCtx }
export const gteNode: Node = { type: 'gte', ...compInT, ...defCtx }
export const lteNode: Node = { type: 'lte', ...compInT, ...defCtx }
export const lparenNode: Node = { type: 'lparen', ...lparenInT, ...lparenCtx }
export const rparenNode: Node = { type: 'rparen', ...rparenInT, ...rparenCtx }
export const ldquoteNode: Node = { type: 'ldquote', ...ldquoteInT, ...ldquoteCtx }
export const rdquoteNode: Node = { type: 'rdquote', ...rdquoteInT, ...rdquoteCtx }
export const idfNode: Node = { type: 'idf', ...idfInT, ...defCtx }
export const stringNode: Node = { type: 'string', ...valInT, ...stringCtx }
export const numberNode: Node = { type: 'number', ...valInT, ...defCtx }
export const spaceNode: Node = { type: 'space', ...valInT, ...defCtx }
export const expressionNode: Node = { type: 'expression', ...exprInT, ...exprCtx }

// Маппинг токена в ноду
export const tokenTypeToNode: Record<TokenType, Node[]> = {
  AND: [andNode],
  OR: [orNode],
  NEQ: [neqNode],
  GTE: [gteNode],
  LTE: [lteNode],
  DOT: [dotNode],
  LPAREN: [lparenNode],
  RPAREN: [rparenNode],
  LDQUOTE: [ldquoteNode],
  RDQUOTE: [rdquoteNode],
  EQ: [eqNode],
  GT: [gtNode],
  LT: [ltNode],
  NUMBER: [numberNode],
  IDENTIFIER: [idfNode],
  STRING: [stringNode],
  SPACE: [spaceNode],
}



export interface AstNode {
  node: Node
  up?: AstNode | undefined
  nodeL?: AstNode | undefined // нода - левый аргумент
  nodeR?: AstNode | undefined // нода - правый аргумент
  value?: any | undefined
}



export function parse(lexemes: Lexeme[]): AstNode {
  const root: AstNode = { node: expressionNode }
  const ctxStack: AstNode[] = [root]
  
  let prev: AstNode = root
  
  for (let i = 0; i < lexemes.length; i++) {
    const lexeme = lexemes[i]
    const { token } = lexeme
    
    const currs = tokenTypeToNode[token.type]
    if (!currs?.length) {
      throw new Error(`No nodes for token type [${token.type}]`)
    }
    const ctxAstNode = ctxStack.at(-1)!
    const ctx = ctxAstNode.node.startCtx!
    const currNode = currs.find(it => it.inCtx.includes(ctx))
    if (!currNode) {
      throw new Error(
        `No nodes for ctx [${ctx}] and token type [${token.type}]. ` + 
        `Expected nodes are [${JSON.stringify(currs)}]`
      )
    }
    
    // Пробелы скипаем
    if (currNode.type === 'space') {
      continue
    }
    
    const curr: AstNode = { node: currNode }
    
    // Если нашли конец контекста то закрываем его
    if (currNode.endCtx) {
      if (ctx !== currNode.endCtx) {
        throw new Error(
          `Trying close context [${currNode.endCtx}] but current context is [${ctx}]`
        )
      }
      insertUpRToCurrL(curr, ctxAstNode)
      ctxStack.length = ctxStack.length - 1
      prev = curr
      continue
    }
    
    
    
    // Если нашли начало контекста, то добавляем его
    if (curr.node.startCtx) {
      ctxStack.push(curr)
    }
    
    
    // Для нод-значений берём и преобразуем значения
    if (currNode.type === 'string') curr.value = lexeme.value
    if (currNode.type === 'number') curr.value = +lexeme.value
    if (currNode.type === 'idf') curr.value = lexeme.value
    
    
    console.log('prev', prev)
    console.log('curr', curr)
    
    
    // Пытаемся присвоить левой ноде текущую правую
    const { node: { needR: prevNeedR } } = prev
    const { node: { forNearL: currForNearL } } = curr
    if (prevNeedR?.length) {
      // Если левой ноде нужна правая, но не подоходит по типу, то кидаем ошибку
      if (!prevNeedR.includes(currForNearL as NodeArgType)) {
        throw new Error(
          `Node of type [${prev.node.type}] ` +
          `expects right arg of [${JSON.stringify(prevNeedR)}], ` +
          `but found node [${JSON.stringify(curr.node)}]`
        )
      }
      // Иначе присваиваем левой ноде правую
      attachCurrToUpEmptyR(curr, prev)
      prev = curr
      continue
    }
    
    // Проверяем, что текущей правой ноде нужна левая
    const { node: { forNearR: prevForNearR } } = prev
    const { node: { needL: currNeedL } } = curr
    // Если текущей ноды не нужны аргументы слева, то кидаем ошибку.
    // Потому что мы уже провирили ранее, что левой ноде тоже не нужны аргументы справа.
    // А смежные ноды не могут не быть связаны друг с другом.
    if (!currNeedL?.length) {
      throw new Error(
        `Expected node to be operation with at least left arg, ` + 
        `but is [${JSON.stringify(curr.node)}]`
      )
    }
    // Если левая нода как аргумент не подходит правой по типу, то кидаем ошибку.
    if (!currNeedL.includes(prevForNearR as NodeArgType)) {
      throw new Error(
        `Node of type [${curr.node.type}] ` +
        `expects left arg of [${JSON.stringify(currNeedL)}], ` +
        `but found node [${JSON.stringify(prev.node)}]`
      )
    }
    
    // Теперь левая нода принимается правой нодой как аргумент.
    // Но левая нода может уже быть занята другой операцией,
    // так что идём проверять приоритеты операций.
    // Здесь не сможет быть такого чтобы нода над левой нодой не имела правого аргумента.
    let upLeft = prev.up
    while (true) {
      if (!upLeft) {
        throw new Error(
          `Unreachable. Up node must be present for [${JSON.stringify(prev)}]`
        )
      }
      // Если у текущей левой ноды приоритет меньше, то идёт выше по дереву.
      if (upLeft.node.forRPrec > curr.node.forLPrec) upLeft = upLeft.up
      // Иначе вклиниваем текущую правую ноду
      else {
        insertUpRToCurrL(curr, upLeft)
        prev = curr
        break
      }
    }
    
    
  }
  
  return root
}



function attachCurrToUpEmptyR(curr: AstNode, upWithEmptyR: AstNode) {
  if (upWithEmptyR.nodeR) {
    throw new Error(
      `Trying to attach to not empty nodeR in [${upWithEmptyR}`
    )
  }
  upWithEmptyR.nodeR = curr
  curr.up = upWithEmptyR
}

function insertUpRToCurrL(curr: AstNode, up: AstNode) {
  if (!up.nodeR) return attachCurrToUpEmptyR(curr, up)
  
  curr.nodeL = up.nodeR
  curr.nodeL.up = curr
  
  up.nodeR = curr
  curr.up = up
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


// Nodes
// export const finalNodes: Node[] = [
//   orNode,
//   andNode,
//   dotNode,
//   eqNode,
//   neqNode,
//   gtNode,
//   ltNode,
//   gteNode,
//   lteNode,
//   ldquoteNode,
//   rdquoteNode,
//   lparenNode,
//   rparenNode,
//   idfNode,
//   stringNode,
//   numberNode,
//   spaceNode,
//   expressionNode,
// ]



/*
 if ('right' in prev && 'left' in curr) {
 throw new Error(`Left and right nodes need each other as arguments`)
 }
 if (!('right' in prev) && !('left' in currNode)) {
 throw new Error(`Left and right nodes don't need each other as arguments`)
 }
 if ('right' in prev && !('left' in currNode)) {
 prev.right = currNode
 currNode.up = prev
 }
 if (!('right' in prev) && 'left' in currNode) {
 
 // Между () ничего нет
 if (prev.type === 'lparen' && currNode.type === 'rparen') {
 throw new Error(`Empty parentheses`)
 }
 
 // Поднимаем текущую ноду наверх если приоритет меньше.
 // Ноды с самым высоким приоритетом являются листьями дерева AST.
 let toDown: Node | undefined = prev
 while (true) {
 if (!toDown) throw new Error(`This is unreachable`)
 if (toDown.rPrec <= currNode.lPrec) break
 
 const up: Node | undefined = toDown.up
 if (!up) throw new Error(`This is unreachable`)
 if (hasNoR(up)) throw new Error(`This is unreachable`)
 
 const down = currNode.left
 if (down) {
 if (hasNoR(toDown)) throw new Error(`This is unreachable`)
 down.up = toDown
 toDown.right = down
 }
 
 currNode.left = toDown
 toDown.up = currNode
 
 currNode.up = up
 up.right = currNode
 
 toDown = up
 }
 if (currNode.type === 'rparen' && currNode.left?.type !== 'lparen') {
 throw new Error(`Unopened right parenthesis`)
 }
 }
 */
 