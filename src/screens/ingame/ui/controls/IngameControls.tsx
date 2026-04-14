import type { StylePropType } from '@@/utils/react/props/propTypes.ts'
import FullscreenIc from '@@/assets/ic/svg/ui/fullscreen.svg?react'
import WindowedIc from '@@/assets/ic/svg/ui/windowed.svg?react'
import SpinnerTwoQuarterArcsIc from '@@/assets/ic/svg/ui/spinner-two-quarter-arcs.svg?react'
import PauseIc from '@@/assets/ic/svg/ui/pause.svg?react'
import { useEffectEvent, useLayoutEffect, useState } from 'react'



// TODO detect PWA fullscreen


// Actually it seems document.fullscreenEnabled value is not changed during document lifecycle.
// I've tried to dynamically change fullscreen attrs on iframe and it has no effect.
const getFullscreenAvailable = () => document.fullscreenEnabled
const getFullscreenActive = () => !!document.fullscreenElement
// Check if gesture activation effect is enabled.
// Usually activation effect lasts 5 secs.
const getGestureHaveActivation = () => navigator.userActivation.isActive
const requestHtmlFullscreen = () => {
  // { navigationUI: 'show' } does not hide bottom navigation island on android
  document.documentElement.requestFullscreen({ navigationUI: 'show' })
}
const exitFullscreen = () => document.exitFullscreen()




function useFullscreen(fullscreenEnabled: boolean) {
  const available = getFullscreenAvailable()
  const enabled = fullscreenEnabled
  const [active, setActive] = useState(getFullscreenActive())
  const pending = enabled && !active
  
  
  useLayoutEffect(() => {
    const onFullscreen = () => { setActive(getFullscreenActive()) }
    document.addEventListener('fullscreenchange', onFullscreen)
    return () => { document.removeEventListener('fullscreenchange', onFullscreen) }
  }, [])
  
  
  const enter = useEffectEvent(() => {
    if (getFullscreenAvailable() && getGestureHaveActivation()) requestHtmlFullscreen()
  })
  const exit = useEffectEvent(() => {
    if (getFullscreenActive()) exitFullscreen()
  })
  useLayoutEffect(() => {
    enabled ? enter() : exit()
  }, [enabled])
  
  
  const tryGoFullscreen = useEffectEvent(() => {
    if (enabled && !active) enter()
  })
  useLayoutEffect(() => {
    const tryFullscreen = () => { tryGoFullscreen() }
    window.addEventListener('click', tryFullscreen)
    window.addEventListener('dblclick', tryFullscreen)
    window.addEventListener('mouseup', tryFullscreen)
    window.addEventListener('pointerup', tryFullscreen)
    window.addEventListener('mousedown', tryFullscreen)
    window.addEventListener('pointerdown', tryFullscreen)
    window.addEventListener('contextmenu', tryFullscreen)
    window.addEventListener('keydown', tryFullscreen)
    window.addEventListener('keypress', tryFullscreen)
    window.addEventListener('touchend', tryFullscreen)
    window.addEventListener('change', tryFullscreen)
    window.addEventListener('submit', tryFullscreen)
    window.addEventListener('reset', tryFullscreen)
    return () => {
      window.removeEventListener('click', tryFullscreen)
      window.removeEventListener('dblclick', tryFullscreen)
      window.removeEventListener('mouseup', tryFullscreen)
      window.removeEventListener('pointerup', tryFullscreen)
      window.removeEventListener('mousedown', tryFullscreen)
      window.removeEventListener('pointerdown', tryFullscreen)
      window.removeEventListener('contextmenu', tryFullscreen)
      window.removeEventListener('keydown', tryFullscreen)
      window.removeEventListener('keypress', tryFullscreen)
      window.removeEventListener('touchend', tryFullscreen)
      window.removeEventListener('change', tryFullscreen)
      window.removeEventListener('submit', tryFullscreen)
      window.removeEventListener('reset', tryFullscreen)
    }
  }, [])
  
  
  return { available, enabled, active, pending }
}




export type IngameControlsProps = {
  containerSt: StylePropType
  controlsSt: StylePropType
  controlsIcSt: StylePropType
}

export default function IngameControls(props: IngameControlsProps) {
  const { containerSt, controlsSt, controlsIcSt } = props
  
  const [fscreenEnabled, setFscreenEnabled] = useState(false)
  const fscreen = useFullscreen(fscreenEnabled)
  
  const enterFscreen = () => setFscreenEnabled(true)
  const exitFscreen = () => setFscreenEnabled(false)
  
  return (
    <div cn='jus-end flex row start-end no-pointer container-size' st={containerSt}>
      <div cn='flex row start-end no-pointer' st={controlsSt}>
        {fscreen.available && (
          <div cn='stack center2 no-pointer' st={controlsIcSt}>
            {!fscreen.enabled && <FullscreenIc cn={`sz-full ${icCn}`} onClick={enterFscreen}/>}
            {fscreen.enabled && <WindowedIc cn={`sz-full ${icCn}`} onClick={exitFscreen}/>}
            {fscreen.pending && (
              <SpinnerTwoQuarterArcsIc
                cn={`sz-[30%] ended2 no-pointer ${icCn} rotation-1s`}
              />
            )}
          </div>
        )}
        <div cn='flexrc center2 no-pointer' st={controlsIcSt}>
          <PauseIc cn={`sz-full ${icCn}`}/>
        </div>
      </div>
    </div>
  )
}



// Content styles
const icCn = 'cl-[var(--cl-hud-tx)] svg-curr-cl'
