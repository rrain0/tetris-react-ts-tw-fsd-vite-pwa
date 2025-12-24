import { tetroOSrsOffsets } from '@lib/tetris-engine/entities/piece/lib/offsets/tetroOSrsOffsets.ts'
import type {
  TetrominoSrsData,
} from '@lib/tetris-engine/entities/piece/model/tetrominoSrs.ts'



export const tetroOSrs: TetrominoSrsData = {
  rotations: [
    [
      [0, 1, 1],
      [0, 1, 1],
      [0, 0, 0],
    ],
    [
      [0, 0, 0],
      [0, 1, 1],
      [0, 1, 1],
    ],
    [
      [0, 0, 0],
      [1, 1, 0],
      [1, 1, 0],
    ],
    [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
  ],
  offsets: tetroOSrsOffsets,
}

