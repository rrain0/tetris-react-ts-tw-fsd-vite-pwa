import { tetroISrsOffsets } from '@lib/tetris-engine/entities/piece/lib/offsets/tetroISrsOffsets.ts'
import type { PieceSrsData } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const pieceISrs: PieceSrsData = {
  position: [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
  ],
  offsets: tetroISrsOffsets,
}

