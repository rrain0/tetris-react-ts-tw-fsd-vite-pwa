import type { OffsetsSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroOSrsOffsets: OffsetsSrs = {
  '0': [
    [0, 0],
  ],
  'R': [
    [0, -1],
  ],
  '2': [
    [-1, -1],
  ],
  'L': [
    [-1, 0],
  ],
}

// invert y-axis
Object.values(tetroOSrsOffsets).forEach(it => it.forEach(it => it[1] = -it[1]))
