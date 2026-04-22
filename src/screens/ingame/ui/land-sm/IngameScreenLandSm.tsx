import type { IngameStats } from '@/screens/ingame/model/ingameScreen.model.ts'
import IngameControls from '@/screens/ingame/ui/controls/IngameControls.tsx'
import type { Field } from '@@/lib/tetris/tetris-engine/entities/field/model/field.ts'
import { elemSizeContain } from '@@/utils/css/elemSizeContain.ts'
import { ingameScreenLandSmSizes } from '@/screens/ingame/ui/land-sm/ingameScreenLandSmSizes.ts'
import TetrisField from '@/widgets/tetris-field/ui/TetrisField.tsx'



export type IngameScreenLandSmProps = IngameStats & {
  field: Field
  nextField: Field
}

export default function IngameScreenLandSm(props: IngameScreenLandSmProps) {
  const { field, nextField, hiScore, score, level, lines } = props
  
  const {
    blockSz,
    fieldBoxBdSz, fieldBoxW, fieldBoxH,
    sideW, sideG, nextW, titleH, digitH,
    controlsIcSz, controlsG, controlsW,
    gameG, gameW, gameH, gameRatio,
    wOfCqh,
  } = ingameScreenLandSmSizes(nextField.cols)
  
  const containerSt = { width: '100%', height: elemSizeContain(gameRatio).height }
  const gameSt = {
    grid: `
      'spaceL fieldBox ... side spaceR ... controlsSpace' 100%
      / 1fr ${wOfCqh(fieldBoxW)}
      ${wOfCqh(gameG)} ${wOfCqh(sideW)} 1fr ${wOfCqh(gameG)}
      ${wOfCqh(controlsW)}
    `,
  }
  const fieldBoxSt = { borderWidth: wOfCqh(fieldBoxBdSz), width: wOfCqh(fieldBoxW) }
  const sideSt = { width: wOfCqh(sideW), gap: wOfCqh(sideG) }
  const titleSt = { fontSize: wOfCqh(titleH) }
  const digitsSt = { fontSize: wOfCqh(digitH) }
  const nextSt = { width: wOfCqh(nextW) }
  const controlsSt = { gap: wOfCqh(controlsG) }
  const controlsIcSt = { width: wOfCqh(controlsIcSz), height: wOfCqh(controlsIcSz) }
  
  return (
    <>
      <div cn='w-full container-size' st={containerSt}>
        <div cn='grid sz-full' st={gameSt}>
          
          <div cn='flex col in-area-[fieldBox] w-ct bd-cl-[var(--cl-tetris-field-bd)] rad-[1cqh]'
            st={fieldBoxSt}
          >
            <TetrisField cn='w-full' field={field}/>
          </div>
          
          <div cn='flex col in-area-[side]' st={sideSt}>
            
            <div cn='txHudTitle' st={titleSt}>
              HI-SCORE
            </div>
            <div cn='flex col end'>
              <div cn='txHudDigits' st={digitsSt}>{hiScore}</div>
            </div>
            
            <div cn='txHudTitle' st={titleSt}>
              SCORE
            </div>
            <div cn='flex col end'>
              <div cn='txHudDigits' st={digitsSt}>{score}</div>
            </div>
            
            <div cn='txHudTitle' st={titleSt}>
              LEVEL
            </div>
            <div cn='flex col end'>
              <div cn='txHudDigits' st={digitsSt}>{level}</div>
            </div>
            
            <div cn='txHudTitle' st={titleSt}>
              LINES
            </div>
            <div cn='flex col end'>
              <div cn='txHudDigits' st={digitsSt}>{lines}</div>
            </div>
            
            <div cn='txHudTitle' st={titleSt}>
              NEXT
            </div>
            <div cn='flex col end'>
              <TetrisField st={nextSt} field={nextField}/>
            </div>
          
          </div>
        
        </div>
      </div>
      
      <IngameControls
        containerSt={containerSt}
        controlsSt={controlsSt}
        controlsIcSt={controlsIcSt}
      />
    </>
  )
}
