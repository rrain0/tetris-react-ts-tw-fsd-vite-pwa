import {
  GamepadInputContext,
  type GamepadInputContextValue,
} from '@lib/gamepad-input/context/GamepadInputContext.ts'
import {
  type GamepadInputEv,
  type GamepadState,
  gamepadToId, gamepadToState,
} from '@lib/gamepad-input/model/gamepadInput.model.ts'
import { arrRemoveI } from '@utils/array/arrRemoveI.ts'
import type { Children } from '@utils/react/props/propTypes.ts'
import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'
import { type Cb, type Cb1 } from '@utils/ts/ts.ts'
import { useLayoutEffect } from 'react'



export default function GamepadInputProvider({ children }: Children) {
  const [getListeners] = useRefGetSet<Set<Cb1<GamepadInputEv>>>(new Set())
  
  const [getState] = useRefGetSet<GamepadState[]>([])
  const [getStopOnRaf, setStopOnRaf] = useRefGetSet<Cb | undefined>(undefined)
  
  const createOnRaf = () => {
    let stop = false
    const stopOnRaf = () => { stop = true }
    const onRaf = () => {
      if (stop) return
      console.log('raf')
      const ts = document.timeline.currentTime as number
      const gps = navigator.getGamepads()
      for (const gp of gps) if (gp) {
        const state = getState()
        let first = false
        const gpState = state.find(it => it.gpId === gamepadToId(gp)) ?? (() => {
          const gpState = gamepadToState(gp)
          first = true
          state.push(gpState)
          return gpState
        })()
        
        const buttonsCnt = gp.buttons.length
        for (let i = 0; i < buttonsCnt; i++) {
          const prev = gpState.buttons[i]
          const curr = gp.buttons[i].value
          if (first || curr !== prev) {
            gpState.buttons[i] = curr
            // Отправить эвент об изменении кнопки как микрозадачу
            setTimeout(() => {
              for (const l of getListeners()) l({
                ts,
                gpId: gpState.gpId,
                gp: gpState.gp,
                buttonI: i,
                buttonValue: curr,
              })
              //console.log(`B${i}[${curr}] of ${gpState.gpId}`)
            })
          }
        }
        const axesCnt = gp.axes.length
        for (let i = 0; i < axesCnt; i++) {
          const prev = gpState.axes[i]
          const curr = gp.axes[i]
          if (first || curr !== prev) {
            gpState.axes[i] = curr
            // Отправить эвент об изменении оси как микрозадачу
            setTimeout(() => {
              for (const l of getListeners()) l({
                ts,
                gpId: gpState.gpId,
                gp: gpState.gp,
                axisI: i,
                axisValue: curr,
              })
              //console.log(`A${i}[${curr}] of ${gpState.gpId}`)
            })
          }
        }
        
        
      }
      requestAnimationFrame(onRaf)
    }
    return { onRaf, stopOnRaf }
  }
  
  const tryStartOnRaf = () => {
    const rafStarted = !!getStopOnRaf()
    const anyGamepad = navigator.getGamepads().some(it => !!it)
    const anyListeners = !!getListeners().size
    const windowFocused = document.hasFocus()
    if (!rafStarted && anyListeners && anyGamepad && windowFocused) {
      const { onRaf, stopOnRaf } = createOnRaf()
      setStopOnRaf(stopOnRaf)
      requestAnimationFrame(onRaf)
    }
  }
  const stopOnRaf = () => {
    getStopOnRaf()?.()
    setStopOnRaf(undefined)
  }
  const tryStopOnRaf = () => {
    const anyGamepad = navigator.getGamepads().some(it => !!it)
    const anyListeners = !!getListeners().size
    const windowFocused = document.hasFocus()
    if (!anyGamepad || !anyListeners || !windowFocused) {
      stopOnRaf()
    }
  }
  
  useLayoutEffect(() => {
    const onGamepadConnected = (ev: GamepadEvent) => {
      const gp = ev.gamepad
      
      //const { index: i, id, buttons: { length: buttonsCnt }, axes: { length: axesCnt } } = gp
      //console.log(`Gamepad connected, index: ${i}, id: ${id}, ${buttonsCnt} buttons, ${axesCnt} axes`)
      //console.log('gamepad', ev)
      //console.log('gamepads', navigator.getGamepads())
      
      // Здесь можно было бы отправить эвенты о начальном положении каждой кнопки,
      // но это не имеет смысла, тк здесь просто по дефолту стоят нули везде,
      // а вот в первом raf уже реальные значения.
      
      tryStartOnRaf()
    }
    
    const onGamepadDisconnected = (ev: GamepadEvent) => {
      const gp = ev.gamepad
      
      //const { index: i, id, buttons: { length: buttonsCnt }, axes: { length: axesCnt } } = gp
      //console.log(`Gamepad disconnected, index: ${i}, id: ${id}, ${buttonsCnt} buttons, ${axesCnt} axes`)
      //console.log('gamepad', ev)
      //console.log('gamepads', navigator.getGamepads())
      
      const state = getState()
      const gpI = state.findIndex(it => it.gpId === gamepadToId(gp))
      const gpState = state[gpI]
      if (gpState) {
        arrRemoveI(state, gpI)
        for (const l of getListeners()) l({
          ts: ev.timeStamp,
          gpId: gpState.gpId,
          gp: gpState.gp,
          disconnected: true,
        })
      }
      tryStopOnRaf()
    }
    
    const onFocus = () => { tryStartOnRaf() }
    const onBlur = () => { tryStopOnRaf() }
    
    window.addEventListener('gamepadconnected', onGamepadConnected)
    window.addEventListener('gamepaddisconnected', onGamepadDisconnected)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    return () => {
      window.removeEventListener('gamepadconnected', onGamepadConnected)
      window.removeEventListener('gamepaddisconnected', onGamepadDisconnected)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
      stopOnRaf()
    }
  }, [])
  
  
  
  const gamepadInputContextValue: GamepadInputContextValue = {
    onGamepadInput: cb => {
      getListeners().add(cb)
      tryStartOnRaf()
    },
    offGamepadInput: cb => {
      getListeners().delete(cb)
      tryStopOnRaf()
    },
  }
  
  
  return (
    <GamepadInputContext value={gamepadInputContextValue}>
      {children}
    </GamepadInputContext>
  )
}
