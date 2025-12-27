import type { FieldPiece } from '@lib/tetris-engine/entities/field-piece/model/fieldPiece.ts'
import { array } from '@utils/array/arrayCreate.ts'



export type PieceBlock = { type: string, pieceId: number | string }
export type FieldBlock = PieceBlock | null

export class Field {
  
  // Coordinates from bottom left.
  // Stores only already fallen blocks.
  blocks: FieldBlock[][] = array(20).map(() => array<FieldBlock>(10, null))
  
  ;*[Symbol.iterator]() {
    for (let y = 0; y < this.blocks.length; y++) {
      for (let x = 0; x < this.blocks[y].length; x++) {
        const block = this.blocks[y][x]
        yield { x, y, block }
      }
    }
  }
  
  
  canPlacePiece(piece: FieldPiece): boolean {
    for (const pieceBlock of piece) {
      const { x, y, element } = pieceBlock
      if (element) {
        const fieldBlock = this.blocks[y]?.[x]
        if (fieldBlock) return false
      }
    }
    return true
  }
  
  // @unsafe
  addPiece(piece: FieldPiece) {
    const { type, id } = piece.piece
    for (const pieceBlock of piece) {
      const { x, y, element } = pieceBlock
      if (element) {
        this.blocks[y][x] = { type, pieceId: id }
      }
    }
  }
  
  // addBlocks
  
  // hasLines
  
  // clearLines
  
}
