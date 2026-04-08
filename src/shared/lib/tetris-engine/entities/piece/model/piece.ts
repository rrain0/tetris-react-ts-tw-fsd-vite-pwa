import {
  type Blocks,
  blocksCols, blocksGetBounds,
  blocksIterator, blocksRows,
} from '@lib/tetris-engine/entities/piece/model/block.ts'
import { mathRotate, moveXy } from '@lib/tetris-engine/shared/utils/piece.ts'
import type { XydxdyOpt } from '@lib/tetris-engine/shared/utils/types.ts'
import type { Id } from '@utils/app/id.ts'



export type PieceBlockValue = 0 | 1
export type PieceBlocks = Blocks<PieceBlockValue>



export class Piece {
  id: Id
  type: Id
  x: number
  y: number
  blocks: PieceBlocks
  // Поворот с системой координат как у часов
  // 0 - 0°, 1 - 90°, 2 - 180°, 3 - 270°/-90°
  rotI = 0
  
  constructor(
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
  
  get rows() { return blocksRows(this.blocks) }
  get cols() { return blocksCols(this.blocks) }
  get bounds() { return blocksGetBounds(this.blocks) }
  
  toTrimmed() {
    const bounds = this.bounds
    if (!bounds) return new Piece(this.id, this.type, this.x, this.y, [], this.rotI)
    const { xFirst, yFirst, xLast, yLast } = bounds
    return new Piece(
      this.id,
      this.type,
      this.x + xFirst,
      this.y + yFirst,
      this.blocks.slice(yFirst, yLast + 1).map(it => it.slice(xFirst, xLast + 1)),
      this.rotI,
    )
  }
  
  toMoved(move: XydxdyOpt): Piece {
    const { x, y } = this
    const { x: x1, y: y1 } = moveXy(x, y, move)
    return new Piece(this.id, this.type, x1, y1, this.blocks, this.rotI)
  }
  toRotatedRight(): IteratorObject<Piece> { return pieceToRotated(this, 1) }
  toRotatedLeft(): IteratorObject<Piece> { return pieceToRotated(this, -1) }
  
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



// Uses mathematical rotation
export function *pieceToRotated(piece: Piece, direction: 1 | -1) {
  const p = piece
  const { blocks, rotI } = mathRotate(p.blocks, p.rotI, direction)
  yield new Piece(p.id, p.type, p.x, p.y, blocks, rotI)
}
