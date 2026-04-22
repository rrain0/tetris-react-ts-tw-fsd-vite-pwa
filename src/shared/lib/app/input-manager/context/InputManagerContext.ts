import type { InputId, InputType } from '@@/lib/app/input-manager/model/inputManager.model.ts'
import { noop } from '@@/utils/react/state/state.ts'
import { createContext } from 'react'



export type InputManagerContextValue = {
  lock: (inputId: InputId, type: InputType) => void,
  unlock: (inputId: InputId, type: InputType) => void,
  tryLock: (inputId: InputId, type: InputType) => boolean,
  allow: (inputId: InputId, type: InputType) => boolean,
}

export const InputManagerContext = createContext<InputManagerContextValue>({
  lock: noop,
  unlock: noop,
  tryLock: () => false,
  allow: () => false,
})
