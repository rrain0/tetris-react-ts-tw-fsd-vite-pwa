import { AppActivitiesContext } from '@lib/activity-manager/context/AppActivitiesContext.ts'
import type { AppActivities, AppActivity } from '@lib/activity-manager/model/app-activity.ts'
import type { Children } from '@utils/react/props/propTypes.ts'
import { isdef } from '@utils/ts/ts.ts'
import { useState } from 'react'



export type AppActivitiesProviderProps = Children & {
  name?: string | undefined
}

export default function AppActivitiesProvider({
  name, children,
}: AppActivitiesProviderProps) {
  
  const main: AppActivity | undefined = isdef(name) ? {
    type: 'main',
    name: name,
    modals: [],
    popovers: [],
  } : undefined
  
  const [activities, setActivities] = useState<AppActivities>({
    main,
    global: {
      type: 'global',
      name: '',
      modals: [],
      popovers: [],
    },
  })
  
  
  return (
    <AppActivitiesContext value={activities}>
      {children}
    </AppActivitiesContext>
  )
}

