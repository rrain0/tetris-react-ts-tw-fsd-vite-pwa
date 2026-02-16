import {
  GamepadRawInputContext,
} from '@lib/gamepad-input/raw/context/GamepadRawInputContext.ts'
import {
  type GamepadInputEv,
} from '@lib/gamepad-input/raw/model/gamepadRawInput.model.ts'
import type { Children } from '@utils/react/props/propTypes.ts'
import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'
import { use, useLayoutEffect } from 'react'



export default function GamepadMappedInputProvider({ children }: Children) {
  
  const mappings: SignalMappings = DInputSignalToXInputMappings
  
  type GamepadId = string
  type SignalId = string
  type State = Record<GamepadId, Record<SignalId, number | undefined>>
  const [getState] = useRefGetSet<State>({ })
  
  const gamepadRawInputContext = use(GamepadRawInputContext)
  useLayoutEffect(() => {
    const onGamepadInput = (ev: GamepadInputEv) => {
      const s = getState()
      if (ev.disconnected) {
        console.log(`disconnected of ${ev.gp.id}`)
        
        delete s[ev.gpId]
      }
      else if (ev.button) {
        console.log(`B${ev.buttonI}[${ev.buttonValue}] of ${ev.gp.id}`)
        
        const gpS = (s[ev.gpId] ??= { })
        const signal = `B${ev.buttonI}`
        
        gpS[signal] = ev.buttonValue
        
        const mps = mappings.filter(it => it.from.some(it => it.id === signal))
      }
      else if (ev.axis) {
        console.log(`A${ev.axisI}[${ev.axisValue}] of ${ev.gp.id}`)
        
        const gpS = (s[ev.gpId] ??= { })
        const signal = `A${ev.axisI}`
        
        gpS[signal] = ev.axisValue
      }
    }
    
    
    
    gamepadRawInputContext.onGamepadInput(onGamepadInput)
    return () => gamepadRawInputContext.offGamepadInput(onGamepadInput)
  }, [gamepadRawInputContext])
  
  
  
  return (
    <>
      {children}
    </>
  )
}





type Signal = {
  id: string
  xinput?: boolean | undefined
  // Значение нажатой кнопки
  on?: number
  // Диапазон нажатой кнопки
  onRange?: { from?: number, to?: number }
  // Диапазон аналогового сигнала
  range?: { from?: number, to?: number }
  // Дефолтное значение, когда маппинг сигнала отсутствует
  off?: number // if needed then default is 0
}
type SignalMapping = {
  from: Signal[]
  to: Signal[]
}
type SignalMappings = SignalMapping[]



const DInputSignalToXInputMappings: SignalMappings = [
  // A
  {
    from: [{ id: 'B2' }],
    to: [{ id: 'A', xinput: true }],
  },
  // B
  {
    from: [{ id: 'B1' }],
    to: [{ id: 'B', xinput: true }],
  },
  // X
  {
    from: [{ id: 'B3' }],
    to: [{ id: 'X', xinput: true }],
  },
  // Y
  {
    from: [{ id: 'B0' }],
    to: [{ id: 'Y', xinput: true }],
  },
  
  // Select
  {
    from: [{ id: 'B8' }],
    to: [{ id: 'Select', xinput: true }],
  },
  // Start
  {
    from: [{ id: 'B9' }],
    to: [{ id: 'Start', xinput: true }],
  },
  
  // LB
  {
    from: [{ id: 'B4' }],
    to: [{ id: 'LB', xinput: true }],
  },
  // RB
  {
    from: [{ id: 'B5' }],
    to: [{ id: 'RB', xinput: true }],
  },
  
  // LSButton
  {
    from: [{ id: 'B10' }],
    to: [{ id: 'LSButton', xinput: true }],
  },
  // RSButton
  {
    from: [{ id: 'B11' }],
    to: [{ id: 'RSButton', xinput: true }],
  },
  
  // LT
  {
    from: [{ id: 'B6' }],
    to: [{ id: 'LT', xinput: true }],
  },
  // RT
  {
    from: [{ id: 'B7' }],
    to: [{ id: 'RT', xinput: true }],
  },
  
  // LXLeft (from DPadL)
  {
    from: [{ id: 'A0', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXLeft', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LXRight (from DPadR)
  {
    from: [{ id: 'A0', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXRight', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYDown (from DPadD)
  {
    from: [{ id: 'A1', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXDown', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYUp (from DPadU)
  {
    from: [{ id: 'A1', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXUp', xinput: true, range: { from: 0, to: 1 } }],
  },
]



const PS3SignalToXInputMappings: SignalMappings = [
  // A
  {
    from: [{ id: 'B2' }],
    to: [{ id: 'A', xinput: true }],
  },
  // B
  {
    from: [{ id: 'B1' }],
    to: [{ id: 'B', xinput: true }],
  },
  // X
  {
    from: [{ id: 'B3' }],
    to: [{ id: 'X', xinput: true }],
  },
  // Y
  {
    from: [{ id: 'B0' }],
    to: [{ id: 'Y', xinput: true }],
  },
  
  // Select
  {
    from: [{ id: 'B8' }],
    to: [{ id: 'Select', xinput: true }],
  },
  // Start
  {
    from: [{ id: 'B9' }],
    to: [{ id: 'Start', xinput: true }],
  },
  
  // LB
  {
    from: [{ id: 'B4' }],
    to: [{ id: 'LB', xinput: true }],
  },
  // RB
  {
    from: [{ id: 'B5' }],
    to: [{ id: 'RB', xinput: true }],
  },
  
  // LSButton
  {
    from: [{ id: 'B10' }],
    to: [{ id: 'LSButton', xinput: true }],
  },
  // RSButton
  {
    from: [{ id: 'B11' }],
    to: [{ id: 'RSButton', xinput: true }],
  },
  
  // LT
  {
    from: [{ id: 'B6' }],
    to: [{ id: 'LT', xinput: true }],
  },
  // RT
  {
    from: [{ id: 'B7' }],
    to: [{ id: 'RT', xinput: true }],
  },
  
  // DPadL
  {
    from: [{ id: 'A9', on: 0.71429 }], // (from DPadL)
    to: [{ id: 'DPadL', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: 0.42857 }], // (from DPadDL)
    to: [{ id: 'DPadL', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: 1.00000 }], // (from DPadUL)
    to: [{ id: 'DPadL', xinput: true }],
  },
  // DPadR
  {
    from: [{ id: 'A9', on: -0.42857 }], // (from DPadR)
    to: [{ id: 'DPadR', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: -0.14286 }], // (from DPadDR)
    to: [{ id: 'DPadR', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: -0.71429 }], // (from DPadUR)
    to: [{ id: 'DPadR', xinput: true }],
  },
  // DPadD
  {
    from: [{ id: 'A9', on: 0.14286 }], // (from DPadD)
    to: [{ id: 'DPadD', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: 0.42857 }], // (from DPadDL)
    to: [{ id: 'DPadD', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: -0.14286 }], // (from DPadDR)
    to: [{ id: 'DPadD', xinput: true }],
  },
  // DPadU
  {
    from: [{ id: 'A9', on: -1.00000 }], // (from DPadU)
    to: [{ id: 'DPadU', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: 1.00000 }], // (from DPadUL)
    to: [{ id: 'DPadU', xinput: true }],
  },
  {
    from: [{ id: 'A9', on: -0.71429 }], // (from DPadUR)
    to: [{ id: 'DPadU', xinput: true }],
  },
  
  // LXLeft
  {
    from: [{ id: 'A0', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXLeft', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LXRight
  {
    from: [{ id: 'A0', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXRight', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYDown
  {
    from: [{ id: 'A1', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXDown', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYUp
  {
    from: [{ id: 'A1', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXUp', xinput: true, range: { from: 0, to: 1 } }],
  },
  
  // RXLeft
  {
    from: [{ id: 'A2', range: { from: 0, to: -1 } }],
    to: [{ id: 'RXLeft', xinput: true, range: { from: 0, to: 1 } }],
  },
  // RXRight
  {
    from: [{ id: 'A2', range: { from: 0, to: 1 } }],
    to: [{ id: 'RXRight', xinput: true, range: { from: 0, to: 1 } }],
  },
  // RYDown
  {
    from: [{ id: 'A5', range: { from: 0, to: 1 } }],
    to: [{ id: 'RXDown', xinput: true, range: { from: 0, to: 1 } }],
  },
  // RYUp
  {
    from: [{ id: 'A5', range: { from: 0, to: -1 } }],
    to: [{ id: 'RXUp', xinput: true, range: { from: 0, to: 1 } }],
  },
]



const XInputSignalToXInputMappings: SignalMappings = [
  // A
  {
    from: [{ id: 'B0' }],
    to: [{ id: 'A', xinput: true }],
  },
  // B
  {
    from: [{ id: 'B1' }],
    to: [{ id: 'B', xinput: true }],
  },
  // X
  {
    from: [{ id: 'B2' }],
    to: [{ id: 'X', xinput: true }],
  },
  // Y
  {
    from: [{ id: 'B3' }],
    to: [{ id: 'Y', xinput: true }],
  },
  
  // Select
  {
    from: [{ id: 'B8' }],
    to: [{ id: 'Select', xinput: true }],
  },
  // Start
  {
    from: [{ id: 'B9' }],
    to: [{ id: 'Start', xinput: true }],
  },
  
  // LB
  {
    from: [{ id: 'B4' }],
    to: [{ id: 'LB', xinput: true }],
  },
  // RB
  {
    from: [{ id: 'B5' }],
    to: [{ id: 'RB', xinput: true }],
  },
  
  // LSButton
  {
    from: [{ id: 'B10' }],
    to: [{ id: 'LSButton', xinput: true }],
  },
  // RSButton
  {
    from: [{ id: 'B11' }],
    to: [{ id: 'RSButton', xinput: true }],
  },
  
  // LT
  {
    from: [{ id: 'B6' }],
    to: [{ id: 'LT', xinput: true }],
  },
  // RT
  {
    from: [{ id: 'B7' }],
    to: [{ id: 'RT', xinput: true }],
  },
  
  // DPadL
  {
    from: [{ id: 'B14' }],
    to: [{ id: 'DPadL', xinput: true }],
  },
  // DPadR
  {
    from: [{ id: 'B15' }],
    to: [{ id: 'DPadR', xinput: true }],
  },
  // DPadD
  {
    from: [{ id: 'B13' }],
    to: [{ id: 'DPadD', xinput: true }],
  },
  // DPadU
  {
    from: [{ id: 'B12' }],
    to: [{ id: 'DPadU', xinput: true }],
  },
  
  // LXLeft
  {
    from: [{ id: 'A0', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXLeft', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LXRight
  {
    from: [{ id: 'A0', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXRight', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYDown
  {
    from: [{ id: 'A1', range: { from: 0, to: 1 } }],
    to: [{ id: 'LXDown', xinput: true, range: { from: 0, to: 1 } }],
  },
  // LYUp
  {
    from: [{ id: 'A1', range: { from: 0, to: -1 } }],
    to: [{ id: 'LXUp', xinput: true, range: { from: 0, to: 1 } }],
  },
  
  // RXLeft
  {
    from: [{ id: 'A2', range: { from: 0, to: -1 } }],
    to: [{ id: 'RXLeft', xinput: true, range: { from: 0, to: 1 } }],
  },
  // RXRight
  {
    from: [{ id: 'A2', range: { from: 0, to: 1 } }],
    to: [{ id: 'RXRight', xinput: true, range: { from: 0, to: 1 } }],
  },
  // RYDown
  {
    from: [{ id: 'A3', range: { from: 0, to: 1 } }],
    to: [{ id: 'RXDown', xinput: true, range: { from: 0, to: 1 } }],
  },
  // RYUp
  {
    from: [{ id: 'A3', range: { from: 0, to: -1 } }],
    to: [{ id: 'RXUp', xinput: true, range: { from: 0, to: 1 } }],
  },
]
