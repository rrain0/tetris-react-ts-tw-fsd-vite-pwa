import { Field } from '@@/lib/tetris-engine/entities/field/model/field.ts'
import type { Piece } from '@@/lib/tetris-engine/entities/piece/model/piece.ts'
import { randomTetrominoSrs } from '@@/lib/tetris-engine/entities/piece/model/tetrominoSrs.ts'
import { matrixCopy } from '@@/lib/tetris-engine/shared/utils/matrix.ts'



const linesToLvlUp = 10
const startLevel = 0



export class Game {
  lines = 0
  score = 0
  
  level = 0
  
  field: Field = Field.empty(10, 24, 0, 4)
  
  current: Piece = randomTetrominoSrs()
  next: Piece = randomTetrominoSrs()
  
  
  copy() {
    const g = new Game()
    g.lines = this.lines
    g.score = this.score
    g.level = this.level
    g.field = this.field.copy()
    g.current = this.current
    g.next = this.next
    return g
  }
  
  
  moveCurrentPieceLeft() {
    const moved = this.current.toMoved({ dx: -1 })
    this.tryPlaceNewCurrentPiece(moved)
  }
  moveCurrentPieceRight() {
    const moved = this.current.toMoved({ dx: 1 })
    this.tryPlaceNewCurrentPiece(moved)
  }
  moveCurrentPieceDown() {
    const moved = this.current.toMoved({ dy: 1 })
    this.tryPlaceNewCurrentPiece(moved)
  }
  moveCurrentPieceUp() {
    const moved = this.current.toMoved({ dy: -1 })
    this.tryPlaceNewCurrentPiece(moved)
  }
  rotateCurrentPieceLeft() {
    for (const rotated of this.current.toRotatedLeft()) {
      if (this.tryPlaceNewCurrentPiece(rotated)) return
    }
  }
  rotateCurrentPieceRight() {
    for (const rotated of this.current.toRotatedRight()) {
      if (this.tryPlaceNewCurrentPiece(rotated)) return
    }
  }
  // Hard drop - drop instantly & lock instantly
  hardDropCurrentPiece() {
    const { x: px, y: py } = this.current
    const { fyEnd } = this.field
    let freeY = fyEnd
    for (const bottomBlock of this.current.getBottomBlocks()) {
      const { x: bpx, y: bpy } = bottomBlock
      const bfx = px + bpx, bfy = py + bpy
      const firstBlockUnder = this.field.firstBlockUnder(bfx, bfy)
      if (firstBlockUnder) freeY = Math.min(freeY, firstBlockUnder.fy - bpy - 1)
    }
    
    const moved = this.current.toMoved({ y: freeY })
    this.current = moved
    this.finishCurrentPiece()
  }
  
  
  tryPlaceNewCurrentPiece(current: Piece): boolean {
    if (this.field.canPlacePiece(current)) {
      this.current = current
      return true
    }
    return false
  }
  
  
  finishCurrentPiece() {
    // Add current piece to field
    this.field.addPiece(this.current)
    
    // Check lines
    
    // Clear lines
    
    // Try spawn new piece
    const spawned = this.trySpawnNewPiece()
    if (!spawned) throw new Error('GAME OVER')
  }
  
  
  trySpawnNewPiece(): boolean {
    if (this.field.canPlacePiece(this.next)) {
      this.current = this.next
      this.next = randomTetrominoSrs()
      return true
    }
    return false
  }
  
  
  renderField() {
    const { y0, blocks } = this.field
    const f = Field.ofBlocks(matrixCopy(blocks).slice(y0), 0, 0)
    f.addPiece(this.current)
    return f
  }
  renderNextField() {
    const nextPiece = this.next.toTrimmed().toMoved({ x: 0, y: 0 })
    const f = Field.empty(nextPiece.cols, nextPiece.rows)
    f.addPiece(nextPiece)
    return f
  }
  renderCombinedField() {
    const { blocks, y0 } = this.field
    const f = Field.ofBlocks(matrixCopy(blocks).slice(y0 - 2), 0, 2)
    
    let nextType
    if (this.current.toTrimmed().y < 0) nextType = 'Ghost' as const
    
    f.addPiece(this.next, nextType)
    f.addPiece(this.current)
    return f
  }
  
  
}
