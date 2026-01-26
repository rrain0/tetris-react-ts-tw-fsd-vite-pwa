import { useEffect } from 'react'
import * as React from 'react'
import InGameScreen from '@screens/InGame/InGameScreen.tsx'



export default function AppLogic() {
  
  
  useEffect(() => {
    console.log('AppLogic eff')
    return () => console.log('AppLogic clr')
  })
  
  return (
    <>
      <InGameScreen/>
    </>
  )
}
