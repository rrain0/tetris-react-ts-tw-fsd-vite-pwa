import type { Img } from '@@/utils/react/props/propTypes.ts'
import * as React from 'react'
import { mapBlockUiTypeToSrc } from '@/widgets/tetris-field/entities/block/lib/blockUi.ts'
import type {
  BlockUiData,
} from '@/widgets/tetris-field/entities/block/model/blockUi.ts'



export type BlockProps = Img & BlockUiData

export default function Block(props: BlockProps) {
  const { type, translucent, pixeled, ...rest } = props
  
  const src = mapBlockUiTypeToSrc(type)
  
  return (
    <img
      cn={`w-full h-auto square object-center object-cover
        ${pixeled || translucent ? 'pixeled-filter' : ''}
      `}
      st={{
        ...translucent && { opacity: 0.6 },
      }}
      src={src}
      {...rest}
    />
  )
}
