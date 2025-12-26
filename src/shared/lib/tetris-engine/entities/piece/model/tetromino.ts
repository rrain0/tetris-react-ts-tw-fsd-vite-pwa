import type { Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'



export type TetrominoType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'

export interface Tetromino {
  position: Position
  // >0 - clockwise, <0 - counterclockwise
  toRotated(direction: number): Tetromino
}
