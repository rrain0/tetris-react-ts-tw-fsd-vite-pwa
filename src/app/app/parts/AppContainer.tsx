import AppActivitiesProvider from '@lib/activity-manager/ui/AppActivitiesProvider.tsx'
import AppActivity from '@lib/activity-manager/ui/AppActivity.tsx'
import * as React from 'react'
import InGameScreen from '@screens/InGame/InGameScreen.tsx'



export default function AppContainer() {
  
  return (
    <AppActivitiesProvider name='InGame'>
      
      <AppActivity name='InGame'>
        <InGameScreen/>
      </AppActivity>
      
    </AppActivitiesProvider>
  )
}
