import { Piece, type Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { Arr4, num2 } from '@lib/tetris-engine/shared/utils/array.ts'
import type { Id } from '@lib/tetris-engine/shared/utils/id.ts'
import { rectMatrixToRotated } from '@lib/tetris-engine/shared/utils/matrix.ts'
import { mod } from '@utils/math/mathOperators.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = Arr4<num2>[]

export type PieceSrsConfig = {
  position: Position
  offsets: OffsetsSrs
}



export class PieceSrs extends Piece {
  offsets: OffsetsSrs
  
  constructor(
    id: Id,
    type: Id,
    position: Position,
    offsets: OffsetsSrs,
  ) {
    super(id, type, position)
    this.offsets = offsets
  }
  
  // Mathematical rotation
  toRotated(direction: number): PieceSrs {
    const d = mod(direction, 4)
    const position = rectMatrixToRotated(this.position, d)
    this.rotI = mod(this.rotI + d, 4)
    if (!position) return this
    return new PieceSrs(this.id, this.type, position, this.offsets)
  }
}
