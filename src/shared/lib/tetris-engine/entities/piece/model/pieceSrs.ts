import { Piece, type Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { Arr4, num2 } from '@lib/tetris-engine/shared/utils/array.ts'
import type { Id } from '@utils/app/id.ts'
import { rectMatrixToRotated } from '@lib/tetris-engine/shared/utils/matrix.ts'
import { mod } from '@utils/math/mathOperators.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = {
  '0': num2[]
  'R': num2[]
  '2': num2[]
  'L': num2[]
}

export type PieceSrsConfig = {
  xy: num2
  position: Position
  offsets: OffsetsSrs
}



export class PieceSrs extends Piece {
  offsets: OffsetsSrs
  
  constructor(
    id: Id,
    type: Id,
    xy: num2,
    position: Position,
    rotI = 0,
    offsets: OffsetsSrs,
  ) {
    super(id, type, xy, position, rotI)
    this.offsets = offsets
  }
  
  toMoved(dxy: num2): PieceSrs {
    const xy: num2 = [this.xy[0] + dxy[0], this.xy[1] + dxy[1]]
    return new PieceSrs(this.id, this.type, xy, this.position, this.rotI, this.offsets)
  }
  
  // Uses mathematical rotation then applies wall kicks
  toRotated(direction: 1 | -1): PieceSrs {
    const position = rectMatrixToRotated(this.position, direction)
    const rotI = mod(this.rotI + direction, 4)
    
    const fromRot = (['0', 'R', '2', 'L'] as const)[this.rotI]
    const toRot = (['0', 'R', '2', 'L'] as const)[rotI]
    const kickTranslation: num2 = [
      this.offsets[fromRot][0][0] - this.offsets[toRot][0][0],
      this.offsets[fromRot][0][1] - this.offsets[toRot][0][1],
    ]
    const xy: num2 = [
      this.xy[0] + kickTranslation[0],
      this.xy[1] + kickTranslation[1],
    ]
    
    return new PieceSrs(this.id, this.type, xy, position, rotI, this.offsets)
  }
}
