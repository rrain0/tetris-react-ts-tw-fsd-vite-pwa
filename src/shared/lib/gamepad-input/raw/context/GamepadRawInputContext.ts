import type {
  GamepadInputEv,
  GamepadState,
} from '@lib/gamepad-input/raw/model/gamepadRawInput.model.ts'
import type { Cb1, Getter } from '@utils/ts/ts.ts'
import { createContext } from 'react'



export type GamepadInputContextValue = {
  getGamepadsState: Getter<GamepadState[]>,
  onGamepadInput: Cb1<Cb1<GamepadInputEv>>
  offGamepadInput: Cb1<Cb1<GamepadInputEv>>
}

export const GamepadRawInputContext = createContext<GamepadInputContextValue>({
  getGamepadsState: () => [],
  onGamepadInput: () => { },
  offGamepadInput: () => { },
})
