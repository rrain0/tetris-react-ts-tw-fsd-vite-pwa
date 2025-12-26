import { tetroOSrsOffsets } from '@lib/tetris-engine/entities/piece/lib/offsets/tetroOSrsOffsets.ts'
import type { Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { SrsPiece } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const pieceOSrs: SrsPiece = {
  position: [
    [0, 1, 1],
    [0, 1, 1],
    [0, 0, 0],
  ].toReversed() as Position,
  offsets: tetroOSrsOffsets,
}

