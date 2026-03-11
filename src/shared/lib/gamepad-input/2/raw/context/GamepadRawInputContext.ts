import type {
  GamepadEv, GamepadId,
  GamepadState,
} from '@lib/gamepad-input/2/raw/model/gamepadRawInput.model.ts'
import type { Cb1, Getter } from '@utils/ts/ts.ts'
import { createContext } from 'react'



export type GamepadInputContextValue = {
  getGamepadsState: Getter<Map<GamepadId, GamepadState>>,
  onGamepad: Cb1<Cb1<GamepadEv>>
  offGamepad: Cb1<Cb1<GamepadEv>>
}

export const GamepadRawInputContext = createContext<GamepadInputContextValue>({
  getGamepadsState: () => new Map(),
  onGamepad: () => { },
  offGamepad: () => { },
})
