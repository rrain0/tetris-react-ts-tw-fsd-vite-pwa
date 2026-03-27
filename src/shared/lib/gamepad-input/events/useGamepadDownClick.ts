import { GamepadChangeContext } from '@lib/gamepad-input/change/context/GamepadChangeContext.ts'
import type { GamepadChangeEv } from '@lib/gamepad-input/change/model/GamepadChange.model.ts'
import { use, useLayoutEffect } from 'react'



export function useGamepadDownClick() {
  
  const gamepadChangeContextValue = use(GamepadChangeContext)
  
  useLayoutEffect(() => {
    const onGamepad = (ev: GamepadChangeEv) => {
      if (ev.type === 'gamepadChange') {
        const gps = gamepadChangeContextValue.getGamepads()
        //...
      }
    }
    
    
    
    gamepadChangeContextValue.on(onGamepad)
    return () => gamepadChangeContextValue.off(onGamepad)
  }, [gamepadChangeContextValue])
  
}
