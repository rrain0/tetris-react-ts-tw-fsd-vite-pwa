import type { Id } from '@lib/tetris-engine/shared/utils/id.ts'
import { array } from '@utils/array/arrayCreate.ts'



// Rectangular matrix
// → x
// ↓ y
export type Position = (0 | 1)[][]



export class Piece {
  id: Id
  type: string
  position: Position
  
  constructor(
    id: Id,
    type: string,
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
  
  // Default rotation - mathematical rotation
  // direction: int, >0 - clockwise, <0 - counterclockwise
  // @unsafe
  toRotated(direction: number): Piece {
    const position = (() => {
      const p = this.position
      if (direction === 1) {
        const ryLen = p[0].length
        const rxLen = p.length
        const rotated: Position = array(ryLen).map(() => array(rxLen, 0))
        for (let y = 0; y < p.length; y++) {
          for (let x = 0; x < p[y].length; x++) {
            rotated[x][rxLen - 1 - y] = p[y][x]
          }
        }
        return rotated
      }
      if (direction === -1) {
        const ryLen = p[0].length
        const rxLen = p.length
        const rotated: Position = array(ryLen).map(() => array(rxLen, 0))
        for (let y = 0; y < p.length; y++) {
          for (let x = 0; x < p[y].length; x++) {
            rotated[ryLen - 1 - x][y] = p[y][x]
          }
        }
        return rotated
      }
      if (direction === 2) {
        const ryLen = p.length
        const rxLen = p[0].length
        const rotated: Position = array(ryLen).map(() => array(rxLen, 0))
        for (let y = 0; y < p.length; y++) {
          for (let x = 0; x < p[y].length; x++) {
            rotated[ryLen - 1 - y][rxLen - 1 - x] = p[y][x]
          }
        }
        return rotated
      }
    })()
    if (!position) return this
    return new Piece(this.id, this.type, position)
  }
}
