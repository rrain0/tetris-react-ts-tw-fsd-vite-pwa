import { useRef } from 'react'



export function useRefGetSet<T>(initialValue: T) {
  
  const ref = useRef(initialValue)
  const get = () => ref.current
  const set = (value: T) => { ref.current = value }
  
  return [
    get, // stable
    set, // stable
    ref, // stable
  ] as const
}
