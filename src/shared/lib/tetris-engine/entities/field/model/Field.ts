import type { Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { TetrominoType } from '@lib/tetris-engine/entities/piece/model/tetromino.ts'
import type { num2 } from '@lib/tetris-engine/shared/array.ts'
import { array } from '@utils/array/arrayCreate.ts'



export type PieceBlock = { piece: TetrominoType, pieceId: number | string }
export type FieldBlock = PieceBlock | null

export class Field {
  
  // Coordinates from bottom left.
  // Stores only already fallen blocks.
  blocks: FieldBlock[][] = array(20).map(() => array<FieldBlock>(10, null))
  
  
  canPlacePiece([x, y]: num2, position: Position): boolean {
    for (let yr = 0; yr < position.length; yr++) {
      for (let xr = 0; xr < position[yr].length; xr++) {
        const pieceBlock = position[yr][xr]
        if (pieceBlock) {
          const fieldBlock = this.blocks[y + yr]?.[x + xr]
          if (fieldBlock) return false
        }
      }
    }
    return true
  }
  
  // @unsafe
  placePiece([x, y]: num2, position: Position) {
    
  }
  
  // addBlocks
  
  // hasLines
  
  // clearLines
  
}
