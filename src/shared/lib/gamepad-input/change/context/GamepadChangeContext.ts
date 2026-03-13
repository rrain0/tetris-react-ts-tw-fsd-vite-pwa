import type { GamepadChangeEv } from '@lib/gamepad-input/change/model/GamepadChange.model.ts'
import type {
  MappedGamepad,
} from '@lib/gamepad-input/mapped/model/mappedGamepad.model.ts'
import type {
  NativeGamepadId,
} from '@lib/gamepad-input/native/model/nativeGamepad.model.ts'
import type { Cb1, Getter } from '@utils/ts/ts.ts'
import { createContext } from 'react'



export type GamepadChangeContextValue = {
  getGamepads: Getter<Map<NativeGamepadId, MappedGamepad>>,
  on: Cb1<Cb1<GamepadChangeEv>>
  off: Cb1<Cb1<GamepadChangeEv>>
}

export const GamepadChangeContext = createContext<GamepadChangeContextValue>({
  getGamepads: () => new Map(),
  on: () => { },
  off: () => { },
})
