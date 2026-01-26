import type { Id } from '@utils/app/id.ts'



export function useAppActivity(
  { id, name }: {
    id?: Id | undefined
    name?: string | undefined
  } = { },
) {
  
  return {
    id: '',
    name: '',
    used: true,
    last: true,
  }
}
