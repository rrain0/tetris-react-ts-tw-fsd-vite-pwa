import {
  GamepadRawInputContext,
  type GamepadInputContextValue,
} from '@lib/gamepad-input/2/raw/context/GamepadRawInputContext.ts'
import {
  type GamepadConnectedEv, type GamepadDisconnectedEv,
  type GamepadEv, type GamepadId,
  type GamepadState, type GamepadTickEv,
  gamepadToId, gamepadToState,
} from '@lib/gamepad-input/2/raw/model/gamepadRawInput.model.ts'
import type { Children } from '@utils/react/props/propTypes.ts'
import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'
import { type Cb, type Cb1 } from '@utils/ts/ts.ts'
import { useLayoutEffect } from 'react'



export default function GamepadRawInputProvider({ children }: Children) {
  const [getListeners] = useRefGetSet<Set<Cb1<GamepadEv>>>(new Set())
  
  const [getState] = useRefGetSet<Map<GamepadId, GamepadState>>(new Map())
  const [getStopOnRaf, setStopOnRaf] = useRefGetSet<Cb | undefined>(undefined)
  
  const createOnRaf = () => {
    let stop = false
    const stopOnRaf = () => { stop = true }
    
    const onRaf = () => {
      if (stop) return
      console.log('raf')
      const ts = document.timeline.currentTime as number
      const gpsRaw = navigator.getGamepads()
      
      for (const gpRaw of gpsRaw) if (gpRaw) {
        const state = getState()
        const gp = gamepadToState(gpRaw)
        state.set(gp.gpId, gp)
      }
      
      const ev: GamepadTickEv = {
        type: 'gamepadTick',
        ts,
      }
      for (const l of getListeners()) l(ev)
      
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
      //console.log(
      // `Gamepad connected, index: ${i}, id: ${id}, ${buttonsCnt} buttons, ${axesCnt} axes`
      //)
      //console.log('gamepad', ev)
      //console.log('gamepads', navigator.getGamepads())
      
      // TODO
      // Внутри данного эвента у геймпада везде стоят нули.
      // В первом raf после эвента уже реальные значения.
      // !!! Так что видимо прям здесь не стоит генерировать эвент подключённого гемпада,
      // а делать его в раф.
      
      // TODO
      // Вопросик - сначала отправлять эвент вниз или сначала запустить raf?
      // Или сначала запустить raf асинхронно?
      
      // TODO
      // Надо ли пустой геймпад добавлять в стэйт?
      
      const gpId = gamepadToId(gp)
      const newEv: GamepadConnectedEv = {
        type: 'gamepadConnected',
        ts: ev.timeStamp,
        gpId,
      }
      for (const l of getListeners()) l(newEv)
      
      tryStartOnRaf()
    }
    
    const onGamepadDisconnected = (ev: GamepadEvent) => {
      const gp = ev.gamepad
      
      //const { index: i, id, buttons: { length: buttonsCnt }, axes: { length: axesCnt } } = gp
      //console.log(
      // `Gamepad disconnected, index: ${i}, id: ${id}, ${buttonsCnt} buttons, ${axesCnt} axes`
      //)
      //console.log('gamepad', ev)
      //console.log('gamepads', navigator.getGamepads())
      
      const state = getState()
      const gpId = gamepadToId(gp)
      if (state.has(gpId)) {
        state.delete(gpId)
        const newEv: GamepadDisconnectedEv = {
          type: 'gamepadDisconnected',
          ts: ev.timeStamp,
          gpId,
        }
        for (const l of getListeners()) l(newEv)
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
    getGamepadsState: getState,
    onGamepad: cb => {
      getListeners().add(cb)
      tryStartOnRaf()
    },
    offGamepad: cb => {
      getListeners().delete(cb)
      tryStopOnRaf()
    },
  }
  
  
  return (
    <GamepadRawInputContext value={gamepadInputContextValue}>
      {children}
    </GamepadRawInputContext>
  )
}
