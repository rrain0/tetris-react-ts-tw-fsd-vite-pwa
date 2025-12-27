import type { OffsetsSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroISrsOffsets: OffsetsSrs = [
  [
    [0, 0],
    [-1, 0],
    [-1, 1],
    [0, 1],
  ],
  [
    [-1, 0],
    [0, 0],
    [1, 1],
    [0, 1],
  ],
  [
    [2, 0],
    [0, 0],
    [-2, 1],
    [0, 1],
  ],
  [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ],
  [
    [2, 0],
    [0, -2],
    [-2, 0],
    [0, 2],
  ],
]

// invert y-axis
tetroISrsOffsets.forEach(it => it.forEach(it => it[1] = -it[1]))
