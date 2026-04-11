import { pieceISrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceISrs.ts'
import { pieceJSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceJSrs.ts'
import { pieceLSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceLSrs.ts'
import { pieceOSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceOSrs.ts'
import { pieceSSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceSSrs.ts'
import { pieceTSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceTSrs.ts'
import { pieceZSrs } from '@lib/tetris-engine/entities/piece/lib/pieces/pieceZSrs.ts'
import { PieceSrs, type PieceSrsDataOpt } from '@lib/tetris-engine/entities/piece/model/pieceSrs.ts'
import { randomFromArray } from '@utils/random/randomFromArray.ts'
import * as uuid from 'uuid'



export function newISrs(data?: PieceSrsDataOpt) {
  const p = pieceISrs
  const {
    id = uuid.v4(), type = 'I', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}
export function newJSrs(data?: PieceSrsDataOpt) {
  const p = pieceJSrs
  const {
    id = uuid.v4(), type = 'J', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}
export function newLSrs(data?: PieceSrsDataOpt) {
  const p = pieceLSrs
  const {
    id = uuid.v4(), type = 'L', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}
export function newOSrs(data?: PieceSrsDataOpt) {
  const p = pieceOSrs
  const {
    id = uuid.v4(), type = 'O', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}
export function newSSrs(data?: PieceSrsDataOpt) {
  const p = pieceSSrs
  const {
    id = uuid.v4(), type = 'S', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}
export function newTSrs(data?: PieceSrsDataOpt) {
  const p = pieceTSrs
  const {
    id = uuid.v4(), type = 'T', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}
export function newZSrs(data?: PieceSrsDataOpt) {
  const p = pieceZSrs
  const {
    id = uuid.v4(), type = 'Z', x = p.x, y = p.y,
    blocks = p.blocks, rotI = 0, offsets = p.offsets,
  } = data ?? { }
  return new PieceSrs({ id, type, x, y, blocks, rotI, offsets })
}



export function randomTetrominoSrs() {
  return randomFromArray([
    newISrs, newJSrs, newLSrs,
    newOSrs, newSSrs, newTSrs,
    newZSrs,
  ])()
}
