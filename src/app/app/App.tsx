import '@app/styles/app.css'
import AppActivitiesProvider from '@lib/activity-manager/ui/AppActivitiesProvider.tsx'
import AppActivity from '@lib/activity-manager/ui/AppActivity.tsx'
import GamepadMappedInputProvider from '@lib/gamepad-input/mapped/ui/GamepadMappedInputProvider.tsx'
import GamepadRawInputProvider from '@lib/gamepad-input/raw/ui/GamepadRawInputProvider.tsx'
import { useState } from 'react'
import * as React from 'react'
import InGameScreen from 'screens/InGame/InGameScreen.tsx'



export default function App() {
  
  const [activity, setActivity] = useState('InGame')
  
  return (
    <>
      <GamepadRawInputProvider>
        <GamepadMappedInputProvider>
          <AppActivitiesProvider currentActivity={activity}>
            
            <AppActivity name='InGame'>
              <InGameScreen/>
            </AppActivity>
          
          </AppActivitiesProvider>
        </GamepadMappedInputProvider>
      </GamepadRawInputProvider>
    </>
  )
}
