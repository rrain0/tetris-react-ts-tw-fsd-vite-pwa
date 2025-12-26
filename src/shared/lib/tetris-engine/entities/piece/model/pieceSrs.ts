import type { Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { Array4, num2 } from '@lib/tetris-engine/shared/array.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = Array4<num2>[]

export interface SrsPiece {
  position: Position
  offsets: OffsetsSrs
}