import { useAsRefGet } from '@utils/react/state/useAsRefGet.ts'
import type { anyfun } from '@utils/ts/ts.ts'



export function useAsCb<F extends anyfun>(cb: F | undefined): F {
  const [getCb] = useAsRefGet(cb)
  const stableCb = (...args) => getCb()?.(...args)
  return stableCb as F
}
