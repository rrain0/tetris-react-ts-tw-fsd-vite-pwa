import { Field } from '@lib/tetris-engine/entities/field/model/field.ts'
import type { Piece } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import { randomTetrominoSrs } from '@lib/tetris-engine/entities/piece/model/tetrominoSrs.ts'
import { matrixCopy } from '@lib/tetris-engine/shared/utils/matrix.ts'



const linesToLvlUp = 10
const startLevel = 0



export class Game {
  lines = 0
  score = 0
  
  level = 0
  
  field: Field = new Field()
  
  current: Piece = randomTetrominoSrs()
  next: Piece = randomTetrominoSrs()
  
  
  spawnNewPiece() {
    if (this.field.canPlacePiece(this.next)) {
      this.current = this.next
      this.next = randomTetrominoSrs()
    }
    else {
      throw new Error('GAME OVER')
    }
  }
  
  
  moveCurrentPieceRight() {
    this.current.xy[0]++
    if (!this.field.canPlacePiece(this.current)) this.current.xy[0]--
  }
  moveCurrentPieceLeft() {
    this.current.xy[0]--
    if (!this.field.canPlacePiece(this.current)) this.current.xy[0]++
  }
  moveCurrentPieceDown() {
    this.current.xy[1]++
    if (!this.field.canPlacePiece(this.current)) this.current.xy[1]--
  }
  
  
  renderField() {
    const f = new Field()
    f.blocks = matrixCopy(this.field.blocks)
    f.addPiece(this.current)
    return f
  }
  
  
}
