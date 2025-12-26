import {
  tetroJLSTZSrsOffsets
} from '@lib/tetris-engine/entities/piece/lib/offsets/tetroJLSTZSrsOffsets.ts'
import type { Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { SrsPiece } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'



export const pieceZSrs: SrsPiece = {
  position: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ].toReversed() as Position,
  offsets: tetroJLSTZSrsOffsets,
}
