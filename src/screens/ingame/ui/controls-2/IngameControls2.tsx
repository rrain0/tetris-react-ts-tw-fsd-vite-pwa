import IngameControls2Button from '@/screens/ingame/ui/controls-2/IngameControls2Button.tsx'
import { usePointerDownClick } from '@@/lib/input/pointer/usePointerDownClick.ts'
import { usePointerStartEnd } from '@@/lib/input/pointer/usePointerStartEnd.ts'
import type { Game } from '@@/lib/tetris/game-engine/entities/game/model/game.ts'
import type { Div } from '@@/utils/react/props/propTypes.ts'
import React from 'react'
import { isMobile } from 'react-device-detect'



export type IngameControlsProps = Div & {
  game: Game,
}

export default function IngameControls2(props: IngameControlsProps) {
  const { game } = props
  
  const onMoveUp = usePointerStartEnd((ev) => {
    if (ev.type === 'pointerStart') game.startMoveUp()
    if (ev.type === 'pointerEnd') game.stopMoveUp()
  })
  const onSoftDrop = usePointerStartEnd((ev) => {
    if (ev.type === 'pointerStart') game.startSoftDrop()
    if (ev.type === 'pointerEnd') game.stopSoftDrop()
  })
  const onHardDrop = usePointerDownClick(() => game.startHardDrop())
  
  if (!isMobile) return undefined
  
  return (
    <div cn='pls-[stretch_start] grid rows-[4fr_5fr] no-pointer' {...props}>
      <div cn='pls-[end_start] flex col start-end g-[8] no-pointer'>
        <IngameControls2Button {...onMoveUp}>
          up
        </IngameControls2Button>
        <IngameControls2Button {...onSoftDrop}>
          down
        </IngameControls2Button>
        <IngameControls2Button {...onHardDrop}>
          hard drop
        </IngameControls2Button>
      </div>
    </div>
  )
}
