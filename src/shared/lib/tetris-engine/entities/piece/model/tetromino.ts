import type { Array4 } from '@lib/tetris-engine/shared/array.ts'



export type Rotation = (0 | 1)[][]
export type Rotations = Array4<Rotation>



export interface Tetromino {
  // >0 - clockwise, <0 - counterclockwise
  toRotated(direction: number): Tetromino
}
