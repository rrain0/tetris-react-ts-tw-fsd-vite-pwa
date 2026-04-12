import type { AppActivities } from '@@/lib/activity-manager/model/app-activity.ts'
import { createContext } from 'react'



export const AppActivitiesContext = createContext<AppActivities>({
  main: undefined,
  global: undefined,
})
