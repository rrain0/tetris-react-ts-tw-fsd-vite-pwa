import type { AppActivityState } from '@@/lib/app/activity-manager/model/app-activity.ts'
import { createContext } from 'react'



export const AppActivityContext = createContext<AppActivityState>({
  name: '',
  rendered: false,
  interactive: false,
})
