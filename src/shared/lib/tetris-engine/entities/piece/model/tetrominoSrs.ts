import { pieceISrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceISrs.ts'
import { pieceJSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceJSrs.ts'
import { pieceLSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceLSrs.ts'
import { pieceOSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceOSrs.ts'
import { pieceSSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceSSrs.ts'
import { pieceTSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceTSrs.ts'
import { pieceZSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceZSrs.ts'
import type { Position } from '@lib/tetris-engine/entities/piece/model/piece.ts'
import type { OffsetsSrs, SrsPiece } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'
import type { Tetromino, TetrominoType } from '@lib/tetris-engine/entities/piece/model/tetromino.ts'





export class TetrominoSrs implements Tetromino {
  type: TetrominoType
  position: Position
  offsets: OffsetsSrs
  
  private constructor(
    type: TetrominoType,
    { position, offsets }: SrsPiece,
  ) {
    this.type = type
    this.position = position
    this.offsets = offsets
  }
  
  toRotated(direction: number): Tetromino {
    throw new Error('Not implemented')
  }
  
  
  static newI = () => new TetrominoSrs('I', pieceISrs)
  static newJ = () => new TetrominoSrs('J', pieceJSrs)
  static newL = () => new TetrominoSrs('L', pieceLSrs)
  static newO = () => new TetrominoSrs('O', pieceOSrs)
  static newS = () => new TetrominoSrs('S', pieceSSrs)
  static newT = () => new TetrominoSrs('T', pieceTSrs)
  static newZ = () => new TetrominoSrs('Z', pieceZSrs)
}
