import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'



export function useAsRefGet<T>(currentValue: T) {
  const [get, set, ref] = useRefGetSet(currentValue)
  set(currentValue)
  
  // all stable
  return [get, ref] as const
}
