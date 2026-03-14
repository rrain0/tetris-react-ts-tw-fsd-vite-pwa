import { AppActivityContext } from '@lib/activity-manager/context/AppActivityContext.ts'
import { GamepadChangeContext } from '@lib/gamepad-input/change/context/GamepadChangeContext.ts'
import type { GamepadChangeEv } from '@lib/gamepad-input/change/model/GamepadChange.model.ts'
import { useGamepadDownClick } from '@lib/gamepad-input/hooks/useGamepadDownClick.ts'
import { Game } from '@lib/tetris-engine/entities/game/model/game.ts'
import { useKeyClick } from '@utils/events/useKeyClick.ts'
import { useKeyDownClick } from '@utils/events/useKeyDownClick.ts'
import { useKeyHold } from '@utils/events/useKeyHold.ts'
import { combineProps } from '@utils/react/props/combineProps.ts'
import { isKeyboardAction } from 'entities/input-layout/lib/isKeyboardAction.ts'
import { use, useLayoutEffect, useState } from 'react'
import Block from '@widgets/tetris-field/entities/block/ui/Block.tsx'
import {
  newISrs, newJSrs, newLSrs, newOSrs, newSSrs, newTSrs, newZSrs,
} from '@lib/tetris-engine/entities/piece/model/tetrominoSrs.ts'
import { mapPieceTypeToBlockUiType } from '@widgets/tetris-field/entities/block/lib/blockUi.ts'




// TODO loading screen to save images to RAM (dataUrl)


const game = new Game()
//game.current = newOSrs(undefined)
game.current.xy = [4, 5]
game.field.addPiece(newTSrs(undefined, [0, 14]).toRotatedRight().next().value!.toRotatedRight().next().value!)
game.field.addPiece(newISrs(undefined, [-3, 15]).toRotatedRight().next().value!)
game.field.addPiece(newZSrs(undefined, [1, 18]))
game.field.addPiece(newSSrs(undefined, [3, 15]).toRotatedLeft().next().value!)
game.field.addPiece(newJSrs(undefined, [4, 18]))
game.field.addPiece(newLSrs(undefined, [6, 14]).toRotatedRight().next().value!)
game.field.addPiece(newOSrs(undefined, [6, 18]))
game.field.addPiece(newTSrs(undefined, [8, 16]).toRotatedLeft().next().value!)



export default function TetrisField() {
  
  
  
  
  const { interactive } = use(AppActivityContext)
  
  const canUseInput = ({ key, mx, my }: {
    key?: string | undefined
    mx?: boolean | undefined
    my?: boolean | undefined
  }) => {
    if (!interactive) return false
    return true
  }
  
  const [field, setField] = useState(() => game.renderField())
  
  
  const focusOnMount = { ref: (elem: HTMLElement | null) => elem?.focus() }
  
  const onMove = useKeyHold({ interval: 150 }, ev => {
    if (isKeyboardAction('ingame', 'moveLeft', ev)) {
      game.moveCurrentPieceLeft()
      setField(game.renderField())
    }
    if (isKeyboardAction('ingame', 'moveRight', ev)) {
      game.moveCurrentPieceRight()
      setField(game.renderField())
    }
    if (isKeyboardAction('ingame', 'moveDown', ev)) {
      game.moveCurrentPieceDown()
      setField(game.renderField())
    }
  })
  
  const onRotate = useKeyDownClick(ev => {
    if (isKeyboardAction('ingame', 'rotateLeft', ev)) {
      game.rotateCurrentPieceLeft()
      setField(game.renderField())
    }
    if (isKeyboardAction('ingame', 'rotateRight', ev)) {
      game.rotateCurrentPieceRight()
      setField(game.renderField())
    }
  })
  
  
  
  
  useGamepadDownClick()
  const gamepadChangeContextValue = use(GamepadChangeContext)
  useLayoutEffect(() => {
    const onGamepad = (ev: GamepadChangeEv) => {
      if (ev.type === 'gamepadChange') {
        const gps = gamepadChangeContextValue.getGamepads()
        for (const [gpId, gp] of gps.entries()) {
          if (gp.state['B2'] === 1) {
            game.rotateCurrentPieceLeft()
            setField(game.renderField())
          }
          else if (gp.state['B1'] === 1) {
            game.rotateCurrentPieceRight()
            setField(game.renderField())
          }
        }
      }
    }
    gamepadChangeContextValue.on(onGamepad)
    return () => gamepadChangeContextValue.off(onGamepad)
  }, [gamepadChangeContextValue])
  
  
  
  
  const onKeyClick = useKeyClick(ev => {
    console.log('keyclick', ev)
  })
  
  
  
  return (
    <div
      // in-focus:bg-[yellow]
      className={`
        grid w-[300] h-ct
        rows-[repeat(20,1fr)] cols-[repeat(10,1fr)]
        
        ${fieldStyle}
      `}
      {...combineProps(
        { tabIndex: -1 }, focusOnMount,
        onMove, onRotate,
        onKeyClick,
      )}
    >
      {[...field].map(({ x, y, block }) => {
        if (!block) return
        const type = mapPieceTypeToBlockUiType(block.type)
        if (!type) return
        const ri = y + 1
        const ci = x + 1
        return (
          <Block type={type}
            key={`${ri} ${ci}`}
            style={{ gridArea: `${ri} / ${ci}` }}
            onFocus={ev => { console.log('block focus') }}
            onBlur={ev => { console.log('block blur') }}
          />
        )
      })}
    </div>
  )
}



const fieldStyle = 'border-[3px] border-solid border-[#808080] rounded-[4px]'
