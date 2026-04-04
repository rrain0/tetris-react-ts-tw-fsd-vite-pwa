import type { num2 } from '@lib/tetris-engine/shared/utils/array.ts'
import type { Id } from '@utils/app/id.ts'



export type Block = 0 | 1

// Rectangular matrix
// → x
// ↓ y
export type Blocks = Block[][]



export abstract class Piece {
  id: Id
  type: Id
  xy: num2
  blocks: Blocks
  // Поворот с системой координат как у часов
  // 0 - 0°, 1 - 90°, 2 - 180°, 3 - 270°/-90°
  rotI = 0
  
  protected constructor(
    id: Id,
    type: Id,
    xy: num2,
    blocks: Blocks,
    rotI = 0,
  ) {
    this.id = id
    this.type = type
    this.xy = xy
    this.blocks = blocks
    this.rotI = rotI
  }
  
  ;*[Symbol.iterator]() {
    const { xy: [x, y], blocks: b } = this
    for (let yb = 0; yb < b.length; yb++) {
      for (let xb = 0; xb < b[yb].length; xb++) {
        const element = b[yb][xb]
        yield { x: x + xb, y: y + yb, xp: xb, yp: yb, element }
      }
    }
  }
  
  abstract toMoved(dxy: num2): Piece
  abstract toRotatedRight(): Generator<Piece>
  abstract toRotatedLeft(): Generator<Piece>
  
  get rows() { return this.blocks.length }
  get cols() { return this.blocks[0].length }
  
  get firstNonEmptyRow() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        if (this.blocks[y][x]) return y
      }
    }
    return this.rows
  }
  get firstNonEmptyCol() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.blocks[y][x]) return x
      }
    }
    return this.cols
  }
}
