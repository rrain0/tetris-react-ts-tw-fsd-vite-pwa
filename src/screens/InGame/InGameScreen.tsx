import * as React from 'react'
import TetrisGlass from '@widgets/tetris-field/ui/TetrisField.tsx'
import FullscreenIc from '@assets/ic/svg/ui/fullscreen.svg?react'
import PauseIc from '@assets/ic/svg/ui/pause.svg?react'



export default function InGameScreen() {
  
  return (
    <>
      <div cn='grid cols-[10fr_6fr]'>
        
        <TetrisGlass/>
        
        <div cn='flex col container-inline-size'>
          <div cn='flex col p-[8cqw]'>
            
            <div cn='flex row center-end p-[4] g-[4] color-[#808080]'>
              <div cn='flex col center sz-[24]'>
                <FullscreenIc cn='sz-full svg-curr-color'/>
              </div>
              <div cn='flex col center sz-[24] p-[1]'>
                <PauseIc cn='sz-full svg-curr-color'/>
              </div>
            </div>
            
            <div cn=''>
              NEXT
            </div>
          
          </div>
        </div>
      
      </div>
    </>
  )
}
