import { Piece, type Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { Arr4, num2 } from '@lib/tetris-engine/shared/utils/array.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = Arr4<num2>[]

export type PieceSrsData = {
  position: Position
  offsets: OffsetsSrs
}

export abstract class PieceSrs extends Piece {
  abstract offsets: OffsetsSrs
}