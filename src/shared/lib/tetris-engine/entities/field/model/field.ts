import {
  type Block,
  blocksCols,
  blocksRows,
} from '@@/lib/tetris-engine/entities/piece/model/block.ts'
import type { Piece, PieceType } from '@@/lib/tetris-engine/entities/piece/model/piece.ts'
import { matrixCopy } from '@@/lib/tetris-engine/shared/utils/matrix.ts'
import type { Id } from '@@/utils/app/id.ts'
import { array } from '@@/utils/array/arrCreate.ts'




export type FieldBlockType = 'Ghost'
export type FieldBlockPresent = {
  id: Id
  type?: FieldBlockType | undefined
  pieceId: Id
  pieceType: PieceType
}
export type FieldBlock = FieldBlockPresent | null
export type FieldBlocks = FieldBlock[][]
export type FieldCoordBlock = {
  x: number, y: number, fx: number, fy: number, value: FieldBlock
}
export type FieldCoordBlockPresent = {
  x: number, y: number, fx: number, fy: number, value: FieldBlockPresent
}



// →x ↓y
export class Field {
  x0: number; y0: number
  blocks: FieldBlocks
  
  private constructor() { }
  static empty(cols: number, rows: number, x0 = 0, y0 = 0) {
    const f = new Field()
    f.x0 = x0
    f.y0 = y0
    f.blocks = array(rows).map(() => array<FieldBlock>(cols, null))
    return f
  }
  static ofBlocks(blocks: FieldBlock[][], x0 = 0, y0 = 0) {
    const f = new Field()
    f.x0 = x0
    f.y0 = y0
    f.blocks = blocks
    return f
  }
  
  copy() {
    const f = new Field()
    f.x0 = this.x0
    f.y0 = this.y0
    f.blocks = matrixCopy(this.blocks)
    return f
  }
  
  get rows() { return blocksRows(this.blocks) }
  get cols() { return blocksCols(this.blocks) }
  get fx0() { return this.x0 }
  get fy0() { return this.y0 }
  get fxStart() { return -this.fx0 }
  get fyStart() { return -this.fy0 }
  get fxEnd() { return this.cols - this.fx0 }
  get fyEnd() { return this.rows - this.fy0 }
  
  
  ;*blocksIterator(): IterableIterator<FieldCoordBlock> {
    const { blocks: b, rows, cols, fx0, fy0 } = this
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const fx = x - fx0, fy = y - fy0
      yield { x, y, fx, fy, value: b[y][x] }
    }
  }
  
  ;*blocksPresentIterator(): IterableIterator<FieldCoordBlockPresent> {
    const { blocks: b, rows, cols, fx0, fy0 } = this
    for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
      const value = b[y][x]
      const fx = x - fx0, fy = y - fy0
      if (value) yield { x, y, fx, fy, value }
    }
  }
  
  ;[Symbol.iterator](): IterableIterator<FieldCoordBlock> { return this.blocksIterator() }
  
  
  firstBlockUnder(fx: number, fy: number): FieldCoordBlockPresent | null {
    const { fx0, fy0, fyEnd } = this
    fy++
    for (; fy < fyEnd; fy++) {
      const x = fx0 + fx, y = fy0 + fy
      const value = this.blocks[y]?.[x]
      if (value) return { x, y, fx, fy, value }
    }
    return null
  }
  
  canPlacePiece(piece: Piece): boolean {
    const { fx0, fy0, fxStart, fxEnd, fyEnd } = this
    const { x: px, y: py } = piece
    
    for (const pieceBlock of piece.blocksPresentIterator()) {
      const { x: bpx, y: bpy } = pieceBlock
      const bfx = px + bpx, bfy = py + bpy
      if (bfx < fxStart || bfx >= fxEnd || bfy >= fyEnd) return false
      const x = fx0 + bfx, y = fy0 + bfy
      const fieldBlockValue = this.blocks[y]?.[x]
      if (fieldBlockValue) return false
    }
    return true
  }
  
  addPiece(piece: Piece, type?: FieldBlockType) {
    const { fx0, fy0, fxStart, fyStart, fxEnd, fyEnd } = this
    const { x: px, y: py, type: pieceType, id: pieceId } = piece
    
    for (const pieceBlock of piece.blocksPresentIterator()) {
      const { x: bpx, y: bpy, value: { id } } = pieceBlock
      const bfx = px + bpx, bfy = py + bpy
      if (bfx >= fxStart && bfx < fxEnd && bfy >= fyStart && bfy < fyEnd) {
        const x = fx0 + bfx, y = fy0 + bfy
        this.blocks[y][x] = { id, type, pieceId, pieceType }
      }
    }
  }
  
  // addBlocks
  
  // hasLines
  
  // clearLines
  
}
