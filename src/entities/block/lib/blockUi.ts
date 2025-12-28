import { mapBlockTypeToSrc } from '@entities/block/lib/block.ts'
import type { BlockUiType } from '@entities/block/model/blockUi.ts'
import type { TetrominoType } from '@lib/tetris-engine/entities/piece/model/tetromino.ts'
import type { Id } from '@lib/tetris-engine/shared/utils/id.ts'
import type { BlockType } from 'entities/block/model/block.ts'



export function mapBlockUiTypeToSrc(type: BlockUiType): string | undefined {
  if (!type) return undefined
  return mapBlockTypeToSrc(type)
}

export function mapPieceTypeToBlockUiType(pieceType: Id): BlockUiType {
  const mapper: Record<TetrominoType, BlockType> = {
    I: 'red',
    J: 'blue',
    L: 'orange',
    O: 'yellow',
    S: 'violet',
    T: 'lightBlue',
    Z: 'green',
  }
  return mapper[pieceType] ?? ''
}