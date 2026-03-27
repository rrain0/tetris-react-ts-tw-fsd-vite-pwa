import { inputLayoutKeyboardDefault } from 'entities/input-layout/lib/inputLayoutKeyboardDefault.ts'
import type { ActionConfig, InputLayoutKeys } from 'entities/input-layout/model/inputLayout.ts'



export function isGamepadKeyAction<T extends keyof InputLayoutKeys>(
  type: T,
  action: keyof InputLayoutKeys[T],
  { signalId }: { signalId: string },
) {
  // @ts-expect-error
  const actionConfig: ActionConfig = inputLayoutKeyboardDefault[type][action]
  return actionConfig.some(it => it.inputMethod === 'gamepad' && it.key === signalId)
}
