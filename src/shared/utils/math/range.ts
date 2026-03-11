import { ifNaN } from '@utils/ts/ts.ts'



export type num2 = [number, number]



export function rangeHas(v: number, [from, to]: num2): boolean {
  return (
    // check for ascending order
    v >= from && v <= to ||
    // check for descending order
    v <= from && v >= to
  )
}



export function rangeMap(v: number, fromRange: num2, toRange: num2): number {
  const vIn0To1 = ifNaN((v - fromRange[0]) / (fromRange[1] - fromRange[0]), 0)
  return vIn0To1 * (toRange[1] - toRange[0]) + toRange[0]
}