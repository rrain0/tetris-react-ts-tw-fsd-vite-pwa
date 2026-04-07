import type { Img } from '@utils/react/props/propTypes.ts'
import * as React from 'react'
import type { BlockType } from '@widgets/tetris-field/entities/block/model/block.ts'
import { mapBlockUiTypeToSrc } from '@widgets/tetris-field/entities/block/lib/blockUi.ts'




export type BlockProps = Img & { type: BlockType }

export default function Block({ type, ...rest }: BlockProps) {
  
  const src = mapBlockUiTypeToSrc(type)
  
  return (
    <img cn='w-full h-auto square object-center object-cover'
      src={src}
      {...rest}
    />
  )
}
