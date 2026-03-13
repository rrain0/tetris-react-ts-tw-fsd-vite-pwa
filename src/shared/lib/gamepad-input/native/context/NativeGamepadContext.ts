import type {
  NativeGamepadEv, NativeGamepadId,
  NativeGamepad,
} from '@lib/gamepad-input/native/model/nativeGamepad.model.ts'
import type { Cb1, Getter } from '@utils/ts/ts.ts'
import { createContext } from 'react'



export type NativeGamepadContextValue = {
  getGamepads: Getter<Map<NativeGamepadId, NativeGamepad | undefined>>,
  on: Cb1<Cb1<NativeGamepadEv>>
  off: Cb1<Cb1<NativeGamepadEv>>
}

export const NativeGamepadContext = createContext<NativeGamepadContextValue>({
  getGamepads: () => new Map(),
  on: () => { },
  off: () => { },
})
