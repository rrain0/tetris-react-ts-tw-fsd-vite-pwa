import type { OffsetsSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroJLSTZSrsOffsets: OffsetsSrs = [
  [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  [
    [0, 0],
    [1, 0],
    [0, 0],
    [-1, 0],
  ],
  [
    [0, 0],
    [1, -1],
    [0, 0],
    [-1, -1],
  ],
  [
    [0, 0],
    [0, 2],
    [0, 0],
    [0, 2],
  ],
  [
    [0, 0],
    [1, 2],
    [0, 0],
    [-1, 2],
  ],
]

// invert y-axis
tetroJLSTZSrsOffsets.forEach(it => it.forEach(it => it[1] = -it[1]))
