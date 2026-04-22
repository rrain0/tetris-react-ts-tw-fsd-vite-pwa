import type {
  NativeGamepadEv, NativeGamepads,
} from '@@/lib/input/gamepad-input/native/model/nativeGamepad.model.ts'
import { mapOf, noop } from '@@/utils/react/state/state.ts'
import type { Cb1, Getter } from '@@/utils/ts/ts.ts'
import { createContext } from 'react'



export type NativeGamepadContextValue = {
  getGamepads: Getter<NativeGamepads>,
  on: Cb1<Cb1<NativeGamepadEv>>
  off: Cb1<Cb1<NativeGamepadEv>>
}

export const NativeGamepadContext = createContext<NativeGamepadContextValue>({
  getGamepads: mapOf,
  on: noop,
  off: noop,
})
