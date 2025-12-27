import { tetroOSrsOffsets } from '@lib/tetris-engine/entities/piece/lib/offsets/tetroOSrsOffsets.ts'
import type { PieceSrsData } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const pieceOSrs: PieceSrsData = {
  position: [
    [0, 1, 1],
    [0, 1, 1],
    [0, 0, 0],
  ],
  offsets: tetroOSrsOffsets,
}

