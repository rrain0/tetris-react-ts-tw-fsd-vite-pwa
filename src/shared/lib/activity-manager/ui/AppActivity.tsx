import { AppActivitiesContext } from '@lib/activity-manager/context/AppActivitiesContext.ts'
import { AppActivityContext } from '@lib/activity-manager/context/AppActivityContext.ts'
import type { AppActivityState } from '@lib/activity-manager/model/app-activity.ts'
import type { Children } from '@utils/react/props/propTypes.ts'
import { isundef } from '@utils/ts/ts.ts'
import { use } from 'react'



export type AppActivityProps = Children & {
  name?: string | undefined
}

export default function AppActivity({ name, children }: AppActivityProps) {
  
  const { main, global } = use(AppActivitiesContext)
  
  if (isundef(main)) return undefined
  if (isundef(name)) return undefined
  
  const value: AppActivityState | undefined = (() => {
    if (main.name === name) return {
      name,
      rendered: true,
      interactive: !main.modals.length,
    }
    return {
      name,
      rendered: false,
      interactive: false,
    }
  })()
  
  return (
    <AppActivityContext value={value}>
      {children}
    </AppActivityContext>
  )
}
