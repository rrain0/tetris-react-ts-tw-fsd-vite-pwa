import { useAsCb } from '@utils/react/state/useAsCb.ts'
import type { Cb1 } from '@utils/ts/ts.ts'
import { useRef } from 'react'



export function useRefGetOnSet<T>(initialValue: T, onSet?: Cb1<T>) {
  const onSetCb = useAsCb(onSet)
  
  const ref = useRef(initialValue)
  const get = () => ref.current
  const set = (value: T) => {
    ref.current = value
    onSetCb(value)
  }
  
  // all stable
  return [get, set, ref] as const
}
