import { isfunction, isobject, isundef } from '@@/utils/ts/ts.ts'



export function combineProps(...propsList: any[]): object {
  const callbacks: Record<string, any[]> = { }
  let combinedProps
  
  for (let i = 0; i < propsList.length; i++) {
    const props = propsList[i]
    if (isobject(props)) {
      // save first props
      if (!combinedProps) combinedProps = { ...props }
      else for (const [p, v] of Object.entries(props)) {
        // save first value
        if (isundef(combinedProps[p])) combinedProps[p] = v
        else {
          const v0 = combinedProps[p]
          
          // combine object or fun refs to single fun ref
          if (p === 'ref') {
            if (!callbacks[p]) {
              callbacks[p] = [v0]
              combinedProps[p] = (ref: any) => {
                for (const cb of callbacks[p]) {
                  if (isfunction(cb)) cb(ref)
                  // @ts-ignore
                  else if (isobject(cb)) cb.current = ref
                }
              }
            }
            callbacks[p].push(v)
          }
          // combine styles to single object
          else if (p === 'style') {
            // @ts-ignore
            combinedProps[p] = { ...combinedProps[p], ...v }
          }
          // combine css classes to single string
          else if (p === 'cn') {
            combinedProps[p] = v0 + ' ' + v
          }
          // combine callbacks to single callback
          else if (isfunction(v)) {
            if (!callbacks[p]) {
              callbacks[p] = [v0]
              combinedProps[p] = (...args: any[]) => {
                for (const cb of callbacks[p]) cb(...args)
              }
            }
            callbacks[p].push(v)
          }
          // replace old value by new value
          else {
            combinedProps[p] = v
          }
          
        }
      }
    }
  }
  
  return combinedProps
}
