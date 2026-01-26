import type { Id } from '@utils/app/id.ts'



export interface AppActivities {
  activities: AppActivity[]
  global: AppActivity
}

/*
 'global' - just container for global modals & popovers.
 'main' - page / screen. Only last one of type is displayed.
 'modal' - some widget requiring action and blocks interactions with other elements.
 'popover' - some widget that not blocks interaction with other elements.
 */
export type AppActivityType = 'global' | 'main' | 'modal' | 'popover'

export interface AppActivity {
  id: Id
  type: AppActivityType
  name: string
  modals: AppActivity[]
  popovers: AppActivity[]
}
