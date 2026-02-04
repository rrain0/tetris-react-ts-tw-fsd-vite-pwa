import { Field } from '@lib/tetris-engine/entities/field/model/field.ts'
import type { Piece } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import { PieceSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'
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
  
  
  moveCurrentPieceLeft() {
    const moved = this.current.toMoved([-1, 0])
    this.tryPlaceNewCurrentPiece(moved)
  }
  moveCurrentPieceRight() {
    const moved = this.current.toMoved([1, 0])
    this.tryPlaceNewCurrentPiece(moved)
  }
  moveCurrentPieceDown() {
    const moved = this.current.toMoved([0, 1])
    this.tryPlaceNewCurrentPiece(moved)
  }
  rotateCurrentPieceLeft() {
    if (this.current instanceof PieceSrs) {
      const rotated = this.current.toRotated(-1)
      this.tryPlaceNewCurrentPiece(rotated)
    }
  }
  rotateCurrentPieceRight() {
    const rotated = this.current.toRotated(1)
    this.tryPlaceNewCurrentPiece(rotated)
  }
  
  
  tryPlaceNewCurrentPiece(current: Piece): boolean {
    if (this.field.canPlacePiece(current)) {
      this.current = current
      return true
    }
    return false
  }
  
  
  renderField() {
    const f = new Field()
    f.blocks = matrixCopy(this.field.blocks)
    f.addPiece(this.current)
    return f
  }
  
  
}
