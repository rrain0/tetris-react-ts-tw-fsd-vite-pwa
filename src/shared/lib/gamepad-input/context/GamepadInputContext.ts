import type { GamepadInputEv } from '@lib/gamepad-input/model/gamepadInput.model.ts'
import type { Cb1 } from '@utils/ts/ts.ts'
import { createContext } from 'react'



export type GamepadInputContextValue = {
  onGamepadInput: Cb1<Cb1<GamepadInputEv>>
  offGamepadInput: Cb1<Cb1<GamepadInputEv>>
}

export const GamepadInputContext = createContext<GamepadInputContextValue>({
  onGamepadInput: () => { },
  offGamepadInput: () => { },
})
