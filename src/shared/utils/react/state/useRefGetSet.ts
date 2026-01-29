import { useRef } from 'react'



export function useRefGetSet<T>(initialValue: T) {
  const ref = useRef(initialValue)
  const get = () => ref.current
  const set = (value: T) => { ref.current = value }
  
  // all stable
  return [get, set, ref] as const
}
