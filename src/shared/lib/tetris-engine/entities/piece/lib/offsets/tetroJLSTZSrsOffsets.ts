import type { OffsetsSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroJLSTZSrsOffsets: OffsetsSrs = {
  '0': [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  'R': [
    [0, 0],
    [1, 0],
    [1, -1],
    [0, 2],
    [1, 2],
  ],
  '2': [
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
    [0, 0],
  ],
  'L': [
    [0, 0],
    [-1, 0],
    [-1, -1],
    [0, 2],
    [-1, 2],
  ],
}

// invert y-axis
Object.values(tetroJLSTZSrsOffsets).forEach(it => it.forEach(it => it[1] = -it[1]))
