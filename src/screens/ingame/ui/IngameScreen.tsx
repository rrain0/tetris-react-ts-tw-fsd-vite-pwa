import { ingameScreenPortSizes } from '@/screens/ingame/ui/port/ingameScreenPortSizes.ts'
import { AppActivityContext } from '@@/lib/app/activity-manager/context/AppActivityContext.ts'
import {
  useGamepadDownClick
} from '@@/lib/input/gamepad-key-events/gamepad-key-down-click/useGamepadDownClick.ts'
import {
  useGamepadKeyHold,
} from '@@/lib/input/gamepad-key-events/gamepad-key-hold/useGamepadKeyHold.ts'
import { useKeyDownClick } from '@@/lib/input/native-button-events/useKeyDownClick.ts'
import { useKeyHold } from '@@/lib/input/native-button-events/useKeyHold.ts'
import useLockSelection from '@@/lib/input/pointer/useLockSelection.ts'
import { usePointer } from '@@/lib/input/pointer/usePointer.ts'
import { Game } from '@@/lib/tetris/tetris-engine/entities/game/model/game.ts'
import { Tetris } from '@@/lib/tetris/tetris-engine/entities/tetris/model/tetris.ts'
import {
  newISrs, newJSrs, newLSrs, newOSrs, newSSrs, newTSrs, newZSrs,
} from '@@/lib/tetris/tetris-engine/entities/piece/model/tetrominoSrs.ts'
import { elemProps } from '@@/utils/elem/elemProps.ts'
import { useFocusWithinElem } from '@@/utils/elem/useFocusWithinElem.ts'
import { useResizeRef } from '@@/utils/elem/useResizeRef.ts'
import { floorTo0 } from '@@/utils/math/rounding.ts'
import { combineProps } from '@@/utils/react/props/combineProps.ts'
import { useRefGetSet } from '@@/utils/react/state/useRefGetSet.ts'
import { assertNever, type Setter, type SetterOrUpdater } from '@@/utils/ts/ts.ts'
import { InputLayoutContext } from '@/entities/input-layout/context/InputLayoutContext.ts'
import { isGamepadKeyAction } from '@/entities/input-layout/model/isGamepadKeyAction.ts'
import { isKeyboardAction } from '@/entities/input-layout/model/isKeyboardAction.ts'
import React, { use, useState } from 'react'
import { ingameScreenLandSmSizes } from '@/screens/ingame/ui/land-sm/ingameScreenLandSmSizes.ts'
import IngameScreenLand from '@/screens/ingame/ui/land/IngameScreenLand.tsx'
import IngameScreenLandSm from '@/screens/ingame/ui/land-sm/IngameScreenLandSm.tsx'
import { ingameScreenLandSizes } from '@/screens/ingame/ui/land/ingameScreenLandSizes.ts'
import IngameScreenPort from '@/screens/ingame/ui/port/IngameScreenPort.tsx'
import PageFullVp from '@@/components/elems/PageFullVp.tsx'
import bg from '@@/assets/im/bg4.jpg'
import type { IngameData } from '@/screens/ingame/model/ingameScreen.model.ts'




// TODO loading screen to save images to RAM (dataUrl)
// TODO ℹ️Use keyboard or mouse key or touch to go fullscreen



const game = (() => {
  const game = new Game()
  game.tetris.current!.x = 4
  game.tetris.current!.y = 5
  game.tetris.field.addPiece(newTSrs({ x: 0, y: 14 }).toRotatedRight().next().value!
    .toRotatedRight().next().value!
  )
  game.tetris.field.addPiece(newISrs({ x: -3, y: 15 }).toRotatedRight().next().value!)
  game.tetris.field.addPiece(newZSrs({ x: 1, y: 18 }))
  game.tetris.field.addPiece(newSSrs({ x: 3, y: 15 }).toRotatedLeft().next().value!)
  game.tetris.field.addPiece(newJSrs({ x: 4, y: 18 }))
  game.tetris.field.addPiece(newLSrs({ x: 6, y: 14 }).toRotatedRight().next().value!)
  game.tetris.field.addPiece(newOSrs({ x: 6, y: 18 }))
  game.tetris.field.addPiece(newTSrs({ x: 8, y: 16 }).toRotatedLeft().next().value!)
  return game
})()
const getIngameData = () => gameToIngameData(game)



export default function IngameScreen() {
  const [ingameData, setIngameData] = useState<IngameData>(getIngameData)
  
  
  const [layout, setLayout] = useState<Layout>(undefined)
  const [getWh, setWh] = useRefGetSet({ w: 0, h: 0 })
  
  const portSizes = ingameScreenPortSizes()
  const landSmSizes = ingameScreenLandSmSizes()
  const landSizes = ingameScreenLandSizes()
  
  const refFun = useResizeRef(elem => {
    if (!elem) setLayout(undefined)
    else {
      const { ratio, wh } = elemProps(elem)
      setWh(wh)
      if (ratio >= landSizes.gameRatio) setLayout('land')
      else if (ratio >= landSmSizes.gameRatio) setLayout('landSm')
      else setLayout('port')
    }
  })
  
  const { interactive } = use(AppActivityContext)
  
  const canUseInput = ({ key, mx, my }: {
    key?: string | undefined
    mx?: boolean | undefined
    my?: boolean | undefined
  }) => {
    if (!interactive) return false
    return true
  }
  
  const refToFocus = useFocusWithinElem()
  
  const { onKeyboardKeyHold, onKeyboardKeyDownClick } = useAppActions({ game, setIngameData })
  
  const [lockSelection, unlockSelection] = useLockSelection()
  
  const [getDpos] = useRefGetSet({ dcol: 0, drot: 0 })
  const onPointer = usePointer((move) => {
    const { ev, start, wasStart, first, last, move: m, vp0, vp, pointerId } = move
    if (wasStart) {
      const prevDpos = getDpos()
      if (first) {
        ev.currentTarget.setPointerCapture(pointerId)
        lockSelection()
        prevDpos.dcol = 0
        prevDpos.drot = 0
      }
      
      if (layout) {
        const blockSz = (() => {
          if (layout === 'land') return landSizes.wOfH(landSizes.blockSz, getWh().h)
          if (layout === 'landSm') return landSmSizes.wOfH(landSizes.blockSz, getWh().h)
          if (layout === 'port') return portSizes.hOfW(landSizes.blockSz, getWh().w)
          assertNever(layout)
        })()
        
        const dcol = floorTo0(m.x / blockSz)
        const drot = floorTo0(m.y / blockSz)
        for (let d = prevDpos.dcol + 1; d <= dcol; d++) {
          game.tetris.moveCurrentPieceRight()
        }
        for (let d = prevDpos.dcol - 1; d >= dcol; d--) {
          game.tetris.moveCurrentPieceLeft()
        }
        for (let d = prevDpos.drot + 1; d <= drot; d++) {
          game.tetris.rotateCurrentPieceRight()
        }
        for (let d = prevDpos.drot - 1; d >= drot; d--) {
          game.tetris.rotateCurrentPieceLeft()
        }
        prevDpos.dcol = dcol
        prevDpos.drot = drot
        
        setIngameData(gameToIngameData(game))
      }
      
      if (last) {
        unlockSelection()
      }
    }
  })
  
  
  return (
    <>
      <PageFullVp cn='p-[8] bg-pos-[center] bg-sz-[cover] no-touch-action'
        st={{ backgroundImage: `url(${bg})` }}
        ref={refToFocus}
        tabIndex={-1}
        {...combineProps(onKeyboardKeyHold, onKeyboardKeyDownClick, onPointer())}
      >
        <div cn='sz-full stack center2 container-size' ref={refFun}>
          <ScreenLayout layout={layout} {...ingameData}/>
        </div>
      </PageFullVp>
    </>
  )
}



type Layout = 'land' | 'landSm' | 'port' | undefined

function ScreenLayout(props: IngameData & { layout: Layout }) {
  const { layout, tetris, ...stats } = props
  return (
    <>
      {layout === 'land' && (
        <IngameScreenLand
          field={tetris.renderField()}
          nextField={tetris.renderNextField()}
          {...stats}
        />
      )}
      {layout === 'landSm' && (
        <IngameScreenLandSm
          field={tetris.renderField()}
          nextField={tetris.renderNextField()}
          {...stats}
        />
      )}
      {layout === 'port' && (
        <IngameScreenPort
          combinedField={tetris.renderCombinedField()}
          isCurrentPieceAboveField={tetris.isCurrentPieceAboveField}
          {...stats}
        />
      )}
    </>
  )
}



type UseAppActionParams = {
  game: Game,
  setIngameData: Setter<IngameData>,
}

function useAppActions(params: UseAppActionParams) {
  const { inputLayout } = use(InputLayoutContext)
  
  const onKeyboardKeyHold = useKeyHold({ interval: 150 }, ev => {
    if (isKeyboardAction('ingame', 'moveLeft', ev, inputLayout)) {
      moveLeft(params)
    }
    if (isKeyboardAction('ingame', 'moveRight', ev, inputLayout)) {
      moveRight(params)
    }
    if (isKeyboardAction('ingame', 'moveDown', ev, inputLayout)) {
      moveDown(params)
    }
    if (isKeyboardAction('ingame', 'moveUp', ev, inputLayout)) {
      moveUp(params)
    }
  })
  
  const onKeyboardKeyDownClick = useKeyDownClick(ev => {
    if (isKeyboardAction('ingame', 'rotateLeft', ev, inputLayout)) {
      rotateLeft(params)
    }
    if (isKeyboardAction('ingame', 'rotateRight', ev, inputLayout)) {
      rotateRight(params)
    }
    if (isKeyboardAction('ingame', 'hardDrop', ev, inputLayout)) {
      hardDrop(params)
    }
  })
  
  
  useGamepadKeyHold({ interval: 150 }, ev => {
    if (isGamepadKeyAction('ingame', 'moveLeft', ev, inputLayout)) {
      moveLeft(params)
    }
    if (isGamepadKeyAction('ingame', 'moveRight', ev, inputLayout)) {
      moveRight(params)
    }
    if (isGamepadKeyAction('ingame', 'moveDown', ev, inputLayout)) {
      moveDown(params)
    }
    if (isGamepadKeyAction('ingame', 'moveUp', ev, inputLayout)) {
      moveUp(params)
    }
  })
  
  useGamepadDownClick(ev => {
    if (isGamepadKeyAction('ingame', 'rotateLeft', ev, inputLayout)) {
      rotateLeft(params)
    }
    if (isGamepadKeyAction('ingame', 'rotateRight', ev, inputLayout)) {
      rotateRight(params)
    }
    if (isGamepadKeyAction('ingame', 'hardDrop', ev, inputLayout)) {
      hardDrop(params)
    }
  })
  
  return { onKeyboardKeyHold, onKeyboardKeyDownClick }
}



function moveLeft({ game, setIngameData }: UseAppActionParams) {
  game.tetris.moveCurrentPieceLeft()
  setIngameData(gameToIngameData(game))
}
function moveRight({ game, setIngameData }: UseAppActionParams) {
  game.tetris.moveCurrentPieceRight()
  setIngameData(gameToIngameData(game))
}
function moveDown({ game, setIngameData }: UseAppActionParams) {
  game.tetris.moveCurrentPieceDown()
  setIngameData(gameToIngameData(game))
}
function moveUp({ game, setIngameData }: UseAppActionParams) {
  game.tetris.moveCurrentPieceUp()
  setIngameData(gameToIngameData(game))
}
function rotateLeft({ game, setIngameData }: UseAppActionParams) {
  game.tetris.rotateCurrentPieceLeft()
  setIngameData(gameToIngameData(game))
}
function rotateRight({ game, setIngameData }: UseAppActionParams) {
  game.tetris.rotateCurrentPieceRight()
  setIngameData(gameToIngameData(game))
}
function hardDrop({ game, setIngameData }: UseAppActionParams) {
  game.tetris.dropCurrentPiece()
  game.tetris.lockCurrentPiece()
  const lines = game.tetris.getFullLines()
  game.tetris.clearLines(lines)
  game.tetris.dropLines(lines)
  game.tetris.spawnNewPieceOrGameOver()
  setIngameData(gameToIngameData(game))
}



function gameToIngameData(game: Game): IngameData {
  const { hiScore, score, level, lines, tetris } = game
  return { hiScore, score, level, lines, tetris: tetris.copy() }
}