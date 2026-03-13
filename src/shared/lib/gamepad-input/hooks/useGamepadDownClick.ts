import {
  NativeGamepadContext
} from '@lib/gamepad-input/native/context/NativeGamepadContext.ts'
import type { NativeGamepadEv } from '@lib/gamepad-input/native/model/nativeGamepad.model.ts'
import { use, useLayoutEffect } from 'react'



export function useGamepadDownClick() {
  
  const nativeGamepadContext = use(NativeGamepadContext)
  
  useLayoutEffect(() => {
    const onGamepad = (ev: NativeGamepadEv) => {
      if (ev.type === 'nativeGamepadDisconnected') {
        console.log(`disconnected of ${ev.gpId}`)
      }
      else if (ev.type === 'nativeGamepadPolled') {
        const state = nativeGamepadContext.getGamepads()
      }
      /* else if (ev.button) {
        console.log(`B${ev.buttonI}[${ev.buttonValue}] of ${ev.gp.id}`)
      }
      else if (ev.axis) {
        console.log(`A${ev.axisI}[${ev.axisValue}] of ${ev.gp.id}`)
      } */
    }
    
    
    
    nativeGamepadContext.on(onGamepad)
    return () => nativeGamepadContext.off(onGamepad)
  }, [nativeGamepadContext])
  
}
