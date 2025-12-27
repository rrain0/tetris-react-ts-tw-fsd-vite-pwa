import type { Piece } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { num2 } from '@lib/tetris-engine/shared/utils/array.ts'



export class FieldPiece {
  xy: num2
  piece: Piece
  
  constructor(
    xy: num2,
    piece: Piece,
  ) {
    this.xy = xy
    this.piece = piece
  }
  
  *[Symbol.iterator]() {
    const [x, y] = this.xy
    for (const pieceBlock of this.piece) {
      const { x: xr, y: yr, element } = pieceBlock
      yield { x: x + xr, y: y + yr, xr, yr, element }
    }
  }
}
