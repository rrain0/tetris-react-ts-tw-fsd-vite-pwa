import { pieceISrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceISrs.ts'
import { pieceJSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceJSrs.ts'
import { pieceLSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceLSrs.ts'
import { pieceOSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceOSrs.ts'
import { pieceSSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceSSrs.ts'
import { pieceTSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceTSrs.ts'
import { pieceZSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceZSrs.ts'
import { PieceSrs } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'
import { randomFromArray } from '@utils/random/randomFromArray.ts'
import * as uuid from 'uuid'



export function newISrs(id = uuid.v4(), x = pieceISrs.x, y = pieceISrs.y) {
  return new PieceSrs(id, 'I', x, y, pieceISrs.blocks, 0, pieceISrs.offsets)
}
export function newJSrs(id = uuid.v4(), x = pieceJSrs.x, y = pieceJSrs.y) {
  return new PieceSrs(id, 'J', x, y, pieceJSrs.blocks, 0, pieceJSrs.offsets)
}
export function newLSrs(id = uuid.v4(), x = pieceLSrs.x, y = pieceLSrs.y) {
  return new PieceSrs(id, 'L', x, y, pieceLSrs.blocks, 0, pieceLSrs.offsets)
}
export function newOSrs(id = uuid.v4(), x = pieceOSrs.x, y = pieceOSrs.y) {
  return new PieceSrs(id, 'O', x, y, pieceOSrs.blocks, 0, pieceOSrs.offsets)
}
export function newSSrs(id = uuid.v4(), x = pieceSSrs.x, y = pieceSSrs.y) {
  return new PieceSrs(id, 'S', x, y, pieceSSrs.blocks, 0, pieceSSrs.offsets)
}
export function newTSrs(id = uuid.v4(), x = pieceTSrs.x, y = pieceTSrs.y) {
  return new PieceSrs(id, 'T', x, y, pieceTSrs.blocks, 0, pieceTSrs.offsets)
}
export function newZSrs(id = uuid.v4(), x = pieceZSrs.x, y = pieceZSrs.y) {
  return new PieceSrs(id, 'Z', x, y, pieceZSrs.blocks, 0, pieceZSrs.offsets)
}



export function randomTetrominoSrs() {
  return randomFromArray([
    newISrs, newJSrs, newLSrs,
    newOSrs, newSSrs, newTSrs,
    newZSrs,
  ])()
}
