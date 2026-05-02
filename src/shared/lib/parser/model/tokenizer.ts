


export type TokenType =
  | 'AND'
  | 'OR'
  | 'NEQ'
  | 'GTE'
  | 'LTE'
  | 'DOT'
  | 'LPAREN'
  | 'RPAREN'
  | 'LDQUOTE'
  | 'RDQUOTE'
  | 'EQ'
  | 'GT'
  | 'LT'
  | 'NUMBER'
  | 'IDENTIFIER'
  | 'SPACE'
  | 'STRING'

export type TokenContextType =
  | ''
  | 'LPAREN'
  | 'LDQUOTE'
  

export interface Token {
  type: TokenType
  string?: string | undefined
  pattern?: RegExp | undefined
  startContext?: TokenContextType | undefined // задать контекст токенизации
  endContext?: TokenContextType | undefined // завершить контекст токенизации
  inContext: TokenContextType[] // токен разрешён в этом контексте
}

export interface Lexeme {
  token: Token
  start: number
  value: string
}

// Типы и паттерны лексем
const andLx = { type: 'AND' as const, pattern: /^(and|AND)/ }
const orLx = { type: 'OR' as const, pattern: /^(or|OR)/ }
const neqLx = { type: 'NEQ' as const, string: '!=' }
const gteLx = { type: 'GTE' as const, string: '>=' }
const lteLx = { type: 'LTE' as const, string: '<=' }
const dotLx = { type: 'DOT' as const, string: '.' }
const lparenLx = { type: 'LPAREN' as const, string: '(' }
const rparenLx = { type: 'RPAREN' as const, string: ')' }
const ldquoteLx = { type: 'LDQUOTE' as const, string: '"' }
const rdquoteLx = { type: 'RDQUOTE' as const, string: '"' }
const eqLx = { type: 'EQ' as const, string: '=' }
const gtLx = { type: 'GT' as const, string: '>' }
const ltLx = { type: 'LT' as const, string: '<' }
const numberLx = { type: 'NUMBER' as const, pattern: /^\d+([.]\d+)?/ }
const idfLx = { type: 'IDENTIFIER' as const, pattern: /^[a-z_]+/i }
const spaceLx = { type: 'SPACE' as const, pattern: /^\s+/ }
const stringLx = { type: 'STRING' as const, pattern: /^[^"]*/ }

// Контекст лексем
const opOrValOrSpCtx = { inContext: ['' as const, 'LPAREN' as const] }
const lparenCtx = { inContext: ['' as const, 'LPAREN' as const], startContext: 'LPAREN'  as const }
const rparenCtx = { inContext: ['LPAREN' as const], endContext: 'LPAREN' as const }
const ldquoteCtx = { inContext: ['' as const, 'LPAREN' as const], startContext: 'LDQUOTE' as const }
const rdquoteCtx = { inContext: ['LDQUOTE' as const], endContext: 'LDQUOTE' as const }
const stringCtx = { inContext: ['LDQUOTE' as const] }

// Токены должны быть в правильном порядке.
// Как минимум если токен фиксированная строка, длинные строки идут раньше.
// Регулярки обычно идут в конце.
export const finalTokens: Token[] = [
  { ...andLx, ...opOrValOrSpCtx },
  { ...orLx, ...opOrValOrSpCtx },
  { ...neqLx, ...opOrValOrSpCtx },
  { ...gteLx, ...opOrValOrSpCtx },
  { ...lteLx, ...opOrValOrSpCtx },
  { ...dotLx, ...opOrValOrSpCtx },
  { ...lparenLx, ...lparenCtx },
  { ...rparenLx, ...rparenCtx },
  { ...ldquoteLx, ...ldquoteCtx },
  { ...rdquoteLx, ...rdquoteCtx },
  { ...eqLx, ...opOrValOrSpCtx },
  { ...gtLx, ...opOrValOrSpCtx },
  { ...ltLx, ...opOrValOrSpCtx },
  { ...numberLx, ...opOrValOrSpCtx },
  { ...idfLx, ...opOrValOrSpCtx },
  { ...spaceLx, ...opOrValOrSpCtx },
  { ...stringLx, ...stringCtx },
]

export function tokenize(input: string, tokens: Token[] = finalTokens): Lexeme[] {
  const contextToTokens = new Map<string, Token[]>()
  const rootContext = ''
  for (const token of tokens) {
    const { inContext = [''] } = token
    for (let context of inContext) {
      context ??= rootContext
      if (!contextToTokens.has(context)) contextToTokens.set(context, [token])
      else contextToTokens.get(context)!.push(token)
    }
  }
  
  const lexemes: Lexeme[] = []
  const contextStack: string[] = [rootContext]
  let i = 0
  while (i < input.length) {
    const context = contextStack.at(-1)!
    
    const availableTokens = contextToTokens.get(contextStack.at(-1)!)
    if (availableTokens) {
      
      const lexeme = matchToken(input, i, availableTokens)
      if (lexeme) {
        
        const { type, startContext, endContext } = lexeme.token
        if (endContext) {
          if (context !== endContext) {
            throw new Error(`Token of type ${type} must be in context ${context}`)
          }
          contextStack.length = contextStack.length - 1
        }
        if (startContext) {
          contextStack.push(startContext)
        }
        
        i = lexeme.start + lexeme.value.length
        lexemes.push(lexeme)
        continue
      }
      
      if (context === 'LDQUOTE') {
        const literalStart = tokens.findLast(it => it.type === 'LDQUOTE')!
        throw new Error(`Незакрытая строка на позиции ${literalStart}`)
      }
      throw new Error(`Неожиданный символ '${input[i]}' на позиции ${i}`)
      throw new Error(
        `No lexeme found at ${i} for ...${input.substring(i, i + 10)}... in context ${context}`
      )
    }
    
    throw new Error(`No available tokens for context: ${context}`)
  }
  
  if (JSON.stringify(contextStack) !== JSON.stringify([''])) {
    if (contextStack.at(-1)! === 'DQUOTE') {
      throw new Error(`Незакрытая строка на позиции ${i}`)
    }
    throw new Error(`Unclosed contexts: ${contextStack.slice(1)}`)
  }
  
  return lexemes
}

function matchToken(input: string, start: number, tokens: Token[]): Lexeme | undefined {
  for (const token of tokens) {
    if (token.string) {
      const value = input.substring(start, start + token.string.length)
      if (token.string === value) return { token, start, value }
    }
    else if (token.pattern) {
      const fromValue = input.substring(start)
      const match = fromValue.match(token.pattern)
      if (match) return { token, start, value: match[0] }
    }
  }
}


export function tokenizerTest() {
  const inputs = [
    'event.type="click"',
    'timestamp>100',
    'value=3.14',
    'a=1.',
    '=', '!=', '>', '<', '>=', '<=',
    'a=1 AND b=2 OR c=3',
    'a=1 and b=2 or c=3',
    '(a=1)',
    'a="hello',
    'a@b',
    '  a  =  1  ',
  ]
  inputs.forEach(it => {
    try {
      console.log('input:', it)
      const lexemes = tokenize(it)
      console.log('lexemes', lexemes.map(({
        token: { type, inContext },
        start,
        value,
      }) => ({
        type, value, ctx: JSON.stringify(inContext), start,
      })))
    }
    catch (err) {
      console.error(err)
    }
  })
}
