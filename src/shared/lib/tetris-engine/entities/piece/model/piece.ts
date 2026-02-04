import type { num2 } from '@lib/tetris-engine/shared/utils/array.ts'
import type { Id } from '@utils/app/id.ts'



// Rectangular matrix
// → x
// ↓ y
export type Position = (0 | 1)[][]



export abstract class Piece {
  id: Id
  type: Id
  xy: num2
  position: Position
  // Поворот с системой координат как у часов
  // 0 - 0°, 1 - 90°, 2 - 180°, 3 - 270°/-90°
  rotI = 0
  
  protected constructor(
    id: Id,
    type: Id,
    xy: num2,
    position: Position,
    rotI = 0,
  ) {
    this.id = id
    this.type = type
    this.xy = xy
    this.position = position
    this.rotI = rotI
  }
  
  ;*[Symbol.iterator]() {
    const { xy: [x, y], position: p } = this
    for (let yp = 0; yp < p.length; yp++) {
      for (let xp = 0; xp < p[yp].length; xp++) {
        const element = p[yp][xp]
        yield { x: x + xp, y: y + yp, xp, yp, element }
      }
    }
  }
  
  abstract toMoved(dxy: num2): Piece
  abstract toRotated(direction: number): Piece
}
