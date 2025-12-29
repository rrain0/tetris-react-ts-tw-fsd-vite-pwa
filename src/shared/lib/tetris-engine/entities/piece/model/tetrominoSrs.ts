import * as uuid from 'uuid'
import { pieceISrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceISrs.ts'
import { pieceJSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceJSrs.ts'
import { pieceLSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceLSrs.ts'
import { pieceOSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceOSrs.ts'
import { pieceSSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceSSrs.ts'
import { pieceTSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceTSrs.ts'
import { pieceZSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceZSrs.ts'
import {
  PieceSrs,
  type PieceSrsConfig,
} from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'
import type { TetrominoType } from '@lib/tetris-engine/entities/piece/model/tetromino.ts'
import type { Id } from '@lib/tetris-engine/shared/utils/id.ts'





export class TetrominoSrs extends PieceSrs {
  declare type: TetrominoType
  
  private constructor(
    id: Id,
    type: TetrominoType,
    { position, offsets }: PieceSrsConfig,
  ) {
    super(id, type, position, offsets)
    this.offsets = offsets
  }
  
  
  
  static newI = (id = uuid.v4()) => new TetrominoSrs(id, 'I', pieceISrs)
  static newJ = (id = uuid.v4()) => new TetrominoSrs(id, 'J', pieceJSrs)
  static newL = (id = uuid.v4()) => new TetrominoSrs(id, 'L', pieceLSrs)
  static newO = (id = uuid.v4()) => new TetrominoSrs(id, 'O', pieceOSrs)
  static newS = (id = uuid.v4()) => new TetrominoSrs(id, 'S', pieceSSrs)
  static newT = (id = uuid.v4()) => new TetrominoSrs(id, 'T', pieceTSrs)
  static newZ = (id = uuid.v4()) => new TetrominoSrs(id, 'Z', pieceZSrs)
}
