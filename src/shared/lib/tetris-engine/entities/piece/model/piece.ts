import {
  type Blocks,
  blocksCols, blocksGetFirstNonEmptyCol,
  blocksGetFirstNonEmptyRow,
  blocksIterator, blocksRows,
} from '@lib/tetris-engine/entities/piece/model/block.ts'
import type { Xydxdy } from '@lib/tetris-engine/shared/utils/types.ts'
import type { Id } from '@utils/app/id.ts'



export type PieceBlockValue = 0 | 1
export type PieceBlocks = Blocks<PieceBlockValue>



export abstract class Piece {
  id: Id
  type: Id
  x: number
  y: number
  blocks: PieceBlocks
  // Поворот с системой координат как у часов
  // 0 - 0°, 1 - 90°, 2 - 180°, 3 - 270°/-90°
  rotI = 0
  
  protected constructor(
    id: Id,
    type: Id,
    x: number,
    y: number,
    blocks: PieceBlocks,
    rotI = 0,
  ) {
    this.id = id
    this.type = type
    this.x = x
    this.y = y
    this.blocks = blocks
    this.rotI = rotI
  }
  
  ;*[Symbol.iterator]() {
    const { x, y, blocks: b } = this
    for (const block of blocksIterator(b)) {
      // xb & yb - x & y in block
      const { x: xb, y: yb, blockValue } = block
      // xp & yp - x & y in piece
      const blockInPiece = { x: x + xb, y: y + yb, xp: xb, yp: yb, blockValue }
      yield blockInPiece
    }
  }
  
  abstract toMoved(xydxdy: Xydxdy): Piece
  abstract toRotatedRight(): Generator<Piece>
  abstract toRotatedLeft(): Generator<Piece>
  
  get rows() { return blocksRows(this.blocks) }
  get cols() { return blocksCols(this.blocks) }
  
  get firstNonEmptyRow() { return blocksGetFirstNonEmptyRow(this.blocks) }
  get firstNonEmptyCol() { return blocksGetFirstNonEmptyCol(this.blocks) }
  
  ;*getBottomBlocks() {
    const { x, y, blocks: b, rows, cols } = this
    for (let xb = 0; xb < cols; xb++) {
      for (let yb = rows - 1; yb >= 0; yb--) {
        const blockValue = b[yb][xb]
        if (blockValue) {
          const blockInPiece = { x: x + xb, y: y + yb, xp: xb, yp: yb, blockValue }
          yield blockInPiece
          break
        }
      }
    }
    
  }
}
