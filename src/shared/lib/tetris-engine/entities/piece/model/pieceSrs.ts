import { Piece, type PieceBlocks } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import { mathRotate, moveXy } from '@lib/tetris-engine/shared/utils/piece.ts'
import type { Id } from '@utils/app/id.ts'
import type { Xy, XydxdyOpt } from '@utils/math/rect.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = {
  '0': Xy[]
  'R': Xy[]
  '2': Xy[]
  'L': Xy[]
}

export type PieceSrsConfig = {
  x: number
  y: number
  blocks: PieceBlocks
  offsets: OffsetsSrs
}



export class PieceSrs extends Piece {
  offsets: OffsetsSrs
  
  constructor(
    id: Id,
    type: Id,
    x: number,
    y: number,
    blocks: PieceBlocks,
    rotI = 0,
    offsets: OffsetsSrs,
  ) {
    super(id, type, x, y, blocks, rotI)
    this.offsets = offsets
  }
  
  override toMoved(move: XydxdyOpt): PieceSrs {
    const { x, y } = this
    const { x: x1, y: y1 } = moveXy(x, y, move)
    return new PieceSrs(this.id, this.type, x1, y1, this.blocks, this.rotI, this.offsets)
  }
  
  override toRotatedRight() { return pieceSrsToRotated(this, 1) }
  override toRotatedLeft() { return pieceSrsToRotated(this, -1) }
}



// Uses mathematical rotation then applies wall kicks
export function *pieceSrsToRotated(piece: PieceSrs, direction: 1 | -1) {
  const p = piece
  const { blocks, rotI } = mathRotate(p.blocks, p.rotI, direction)
  
  const fromRot = (['0', 'R', '2', 'L'] as const)[p.rotI]
  const toRot = (['0', 'R', '2', 'L'] as const)[rotI]
  for (let i = 0; i < p.offsets[fromRot].length; i++)  {
    const kickTranslation = {
      x: p.offsets[fromRot][i].x - p.offsets[toRot][i].x,
      y: p.offsets[fromRot][i].y - p.offsets[toRot][i].y,
    }
    const x = p.x + kickTranslation.x
    const y = p.y + kickTranslation.y
    yield new PieceSrs(p.id, p.type, x, y, blocks, rotI, p.offsets)
  }
}
