import { inputLayoutKeyboardDefault } from 'entities/input-layout/lib/inputLayoutKeyboardDefault.ts'
import type { ActionConfig, InputLayoutKeys } from 'entities/input-layout/model/inputLayout.ts'



export function isKeyboardAction<T extends keyof InputLayoutKeys>(
  type: T,
  action: keyof InputLayoutKeys[T],
  { code }: { code: string }, // KeyboardEvent.code
) {
  // @ts-expect-error
  const actionConfig: ActionConfig = inputLayoutKeyboardDefault[type][action]
  return actionConfig.some(it => it.inputMethod === 'keyboard' && it.key === code)
}
