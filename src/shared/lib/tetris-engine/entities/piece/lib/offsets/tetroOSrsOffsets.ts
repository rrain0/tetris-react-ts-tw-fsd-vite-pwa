import type { OffsetsSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroOSrsOffsets: OffsetsSrs = [
  [
    [0, 0],
    [0, -1],
    [-1, -1],
    [-1, 0],
  ],
]

// invert y-axis
tetroOSrsOffsets.forEach(it => it.forEach(it => it[1] = -it[1]))
