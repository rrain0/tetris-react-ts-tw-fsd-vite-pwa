import type { OffsetsSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroISrsOffsets: OffsetsSrs = {
  '0': [
    [0, 0],
    [-1, 0],
    [2, 0],
    [-1, 0],
    [2, 0],
  ],
  'R': [
    [-1, 0],
    [0, 0],
    [0, 0],
    [0, 1],
    [0, -2],
  ],
  '2': [
    [-1, 1],
    [1, 1],
    [-2, 1],
    [1, 0],
    [-2, 0],
  ],
  'L': [
    [0, 1],
    [0, 1],
    [0, 1],
    [0, -1],
    [0, 2],
  ],
}

// invert y-axis
Object.values(tetroISrsOffsets).forEach(it => it.forEach(it => it[1] = -it[1]))
