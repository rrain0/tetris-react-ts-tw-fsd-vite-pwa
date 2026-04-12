import type { OffsetsSrs } from '@@/lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const tetroISrsOffsets: OffsetsSrs = {
  '0': [
    { x: 0, y: 0 },
    { x: -1, y: 0 },
    { x: 2, y: 0 },
    { x: -1, y: 0 },
    { x: 2, y: 0 },
  ],
  'R': [
    { x: -1, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -2 },
  ],
  '2': [
    { x: -1, y: 1 },
    { x: 1, y: 1 },
    { x: -2, y: 1 },
    { x: 1, y: 0 },
    { x: -2, y: 0 },
  ],
  'L': [
    { x: 0, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: 1 },
    { x: 0, y: -1 },
    { x: 0, y: 2 },
  ],
}

// invert y-axis
Object.values(tetroISrsOffsets).forEach(it => it.forEach(it => it[1] = -it[1]))
