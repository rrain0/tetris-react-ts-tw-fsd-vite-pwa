import type { Id } from '@lib/tetris-engine/shared/utils/id.ts'



// Rectangular matrix
// → x
// ↓ y
export type Position = (0 | 1)[][]



export abstract class Piece {
  id: Id
  type: Id
  position: Position
  rotI = 0
  
  protected constructor(
    id: Id,
    type: Id,
    position: Position,
  ) {
    this.id = id
    this.type = type
    this.position = position
  }
  
  *[Symbol.iterator]() {
    for (let y = 0; y < this.position.length; y++) {
      for (let x = 0; x < this.position[y].length; x++) {
        const element = this.position[y][x]
        yield { x, y, element }
      }
    }
  }
  
  abstract toRotated(direction: number): Piece
}
