


export const compareAny = (a: any, b: any) => a < b ? -1 : a > b ? 1 : 0
export const compareAnyReversed = (a: any, b: any) => compareAny(b, a)

export function compareNumbers(a: number, b: number) {
  if (Number.isNaN(a) && Number.isNaN(b)) return 0
  if (Number.isNaN(a)) return -1
  if (Number.isNaN(b)) return 1
  return compareAny(a, b)
}
