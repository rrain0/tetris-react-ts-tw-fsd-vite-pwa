


// Rounds half up to +Inf
// Rounds using toFixed
// Scale must be 0..100
export const rf = (n: number, scale = 0): number => +n.toFixed(scale)
export const rf1 = (n: number) => rf(n, 1)
export const rf3 = (n: number) => rf(n, 3)
export const rf5 = (n: number) => rf(n, 5)
