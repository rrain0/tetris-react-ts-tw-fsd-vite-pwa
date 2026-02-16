import { GamepadRawInputContext } from '@lib/gamepad-input/raw/context/GamepadRawInputContext.ts'
import type { GamepadInputEv } from '@lib/gamepad-input/raw/model/gamepadRawInput.model.ts'
import { use, useLayoutEffect } from 'react'



export function useGamepadDownClick() {
  
  const gamepadInputContext = use(GamepadRawInputContext)
  useLayoutEffect(() => {
    const onGamepadInput = (ev: GamepadInputEv) => {
      if (ev.disconnected) {
        console.log(`disconnected of ${ev.gp.id}`)
      }
      else if (ev.button) {
        console.log(`B${ev.buttonI}[${ev.buttonValue}] of ${ev.gp.id}`)
      }
      else if (ev.axis) {
        console.log(`A${ev.axisI}[${ev.axisValue}] of ${ev.gp.id}`)
      }
    }
    
    
    
    gamepadInputContext.onGamepadInput(onGamepadInput)
    return () => gamepadInputContext.offGamepadInput(onGamepadInput)
  }, [gamepadInputContext])
  
}
