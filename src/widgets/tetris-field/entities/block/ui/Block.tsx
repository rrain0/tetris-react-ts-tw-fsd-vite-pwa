import type { Img } from '@@/utils/react/props/propTypes.ts'
import * as React from 'react'
import { mapBlockUiTypeToSrc } from '@/widgets/tetris-field/entities/block/lib/blockUi.ts'
import type {
  BlockUiData,
} from '@/widgets/tetris-field/entities/block/model/blockUi.ts'



export type BlockProps = Img & { data: BlockUiData }

export default function Block({ data, ...rest }: BlockProps) {
  const { type, translucent } = data
  
  const src = mapBlockUiTypeToSrc(type)
  
  return (
    <img cn='w-full h-auto square object-center object-cover'
      st={{ ...translucent && { opacity: 0.35 } }}
      src={src}
      {...rest}
    />
  )
}
