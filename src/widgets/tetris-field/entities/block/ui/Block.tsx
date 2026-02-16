import { combineProps } from '@utils/react/props/combineProps.ts'
import type { ComponentProps } from 'react'
import * as React from 'react'
import type { BlockType } from '@widgets/tetris-field/entities/block/model/block.ts'
import { mapBlockUiTypeToSrc } from '@widgets/tetris-field/entities/block/lib/blockUi.ts'



export default function Block({
  type, ...rest
}: ComponentProps<'img'> & { type: BlockType }) {
  
  const src = mapBlockUiTypeToSrc(type)
  
  return (
    <img
      {...combineProps(
        { src, className: 'w-full h-auto square object-center object-cover' },
        rest
      )}
    />
  )
}
