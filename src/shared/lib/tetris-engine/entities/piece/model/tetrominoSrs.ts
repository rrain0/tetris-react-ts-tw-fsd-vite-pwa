import { tetroISrs } from '@lib/tetris-engine/entities/piece/lib/tetroISrs.ts'
import { tetroJSrs } from '@lib/tetris-engine/entities/piece/lib/tetroJSrs.ts'
import { tetroLSrs } from '@lib/tetris-engine/entities/piece/lib/tetroLSrs.ts'
import { tetroOSrs } from '@lib/tetris-engine/entities/piece/lib/tetroOSrs.ts'
import { tetroSSrs } from '@lib/tetris-engine/entities/piece/lib/tetroSSrs.ts'
import { tetroTSrs } from '@lib/tetris-engine/entities/piece/lib/tetroTSrs.ts'
import { tetroZSrs } from '@lib/tetris-engine/entities/piece/lib/tetroZSrs.ts'
import type { Rotations, Tetromino } from '@lib/tetris-engine/entities/piece/model/tetromino.ts'
import type { Array4, num2 } from '@lib/tetris-engine/shared/array.ts'



// Srs - Super Rotation System https://harddrop.com/wiki/SRS

export type OffsetsSrs = Array4<num2>[]
export type TetrominoSrsData = {
  rotations: Rotations
  offsets: OffsetsSrs
}

export class TetrominoSrs implements Tetromino {
  
  constructor(public data: TetrominoSrsData) { }
  
  toRotated(direction: number): Tetromino {
    throw new Error('Not implemented')
  }
  
  static tetroI = () => new TetrominoSrs(tetroISrs)
  static tetroJ = () => new TetrominoSrs(tetroJSrs)
  static tetroL = () => new TetrominoSrs(tetroLSrs)
  static tetroO = () => new TetrominoSrs(tetroOSrs)
  static tetroS = () => new TetrominoSrs(tetroSSrs)
  static tetroT = () => new TetrominoSrs(tetroTSrs)
  static tetroZ = () => new TetrominoSrs(tetroZSrs)
}

