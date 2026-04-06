import { Piece, type PieceBlocks } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { num2, Xydxdy } from '@lib/tetris-engine/shared/utils/types.ts'
import type { Id } from '@utils/app/id.ts'
import { rectMatrixToRotated } from '@lib/tetris-engine/shared/utils/matrix.ts'
import { mod } from '@utils/math/mod.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = {
  '0': num2[]
  'R': num2[]
  '2': num2[]
  'L': num2[]
}

export type PieceSrsConfig = {
  xy: num2
  blocks: PieceBlocks
  offsets: OffsetsSrs
}



export class PieceSrs extends Piece {
  offsets: OffsetsSrs
  
  constructor(
    id: Id,
    type: Id,
    xy: num2,
    blocks: PieceBlocks,
    rotI = 0,
    offsets: OffsetsSrs,
  ) {
    super(id, type, xy, blocks, rotI)
    this.offsets = offsets
  }
  
  override toMoved({ x, y, dx, dy }: Xydxdy): PieceSrs {
    const [x0, y0] = this.xy
    const x1y1: num2 = [(x ?? x0) + (dx ?? 0), (y ?? y0) + (dy ?? 0)]
    return new PieceSrs(this.id, this.type, x1y1, this.blocks, this.rotI, this.offsets)
  }
  
  override toRotatedRight() {
    return this.toRotated(1)
  }
  override toRotatedLeft() {
    return this.toRotated(-1)
  }
  
  // Uses mathematical rotation then applies wall kicks
  ;*toRotated(direction: 1 | -1) {
    const blocks = rectMatrixToRotated(this.blocks, direction)
    const rotI = mod(this.rotI + direction, 4)
    
    const fromRot = (['0', 'R', '2', 'L'] as const)[this.rotI]
    const toRot = (['0', 'R', '2', 'L'] as const)[rotI]
    for (let i = 0; i < this.offsets[fromRot].length; i++)  {
      const kickTranslation: num2 = [
        this.offsets[fromRot][i][0] - this.offsets[toRot][i][0],
        this.offsets[fromRot][i][1] - this.offsets[toRot][i][1],
      ]
      const xy: num2 = [
        this.xy[0] + kickTranslation[0],
        this.xy[1] + kickTranslation[1],
      ]
      yield new PieceSrs(this.id, this.type, xy, blocks, rotI, this.offsets)
    }
  }
}
