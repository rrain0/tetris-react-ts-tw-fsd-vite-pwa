import { useState } from 'react'
import * as React from 'react'
import TetrisGlass from '@widgets/tetris-field/ui/TetrisField.tsx'



export default function InGameScreen() {
  
  const [cnt, setCnt] = useState(0)
  
  return (
    <>
      <div className='flex col'>
        
        <button onClick={() => setCnt(curr => curr + 1)}>Button, {cnt}</button>
        <input/>
        
        <TetrisGlass/>
      
      </div>
    </>
  )
}
