import type {
  InputIdData,
} from '@@/lib/app/input-manager/model/inputManager.model.ts'
import { noop } from '@@/utils/react/state/state.ts'
import { createContext } from 'react'



export type InputManagerContextValue = {
  lock: (lock: InputIdData) => void,
  unlock: (lock: InputIdData) => void,
  tryLock: (lock: InputIdData) => boolean,
  allowed: (lock: InputIdData) => boolean,
}

export const InputManagerContext = createContext<InputManagerContextValue>({
  lock: noop,
  unlock: noop,
  tryLock: () => false,
  allowed: () => false,
})
