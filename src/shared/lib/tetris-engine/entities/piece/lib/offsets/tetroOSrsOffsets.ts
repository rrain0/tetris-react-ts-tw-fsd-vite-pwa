import type { OffsetsSrs } from '@@/lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroOSrsOffsets: OffsetsSrs = {
  '0': [
    { x: 0, y: 0 },
  ],
  'R': [
    { x: 0, y: -1 },
  ],
  '2': [
    { x: -1, y: -1 },
  ],
  'L': [
    { x: -1, y: 0 },
  ],
}

// invert y-axis
Object.values(tetroOSrsOffsets).forEach(it => it.forEach(it => it.y = -it.y))
