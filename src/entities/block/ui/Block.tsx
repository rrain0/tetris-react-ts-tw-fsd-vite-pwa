import type { ClassStyle } from '@utils/react/props/reactPropTypes.ts'
import * as React from 'react'
import type { BlockType } from 'src/entities/block/model/block.ts'
import { mapBlockUiTypeToSrc } from 'src/entities/block/lib/blockUi.ts'



export default function Block({
  type, ...rest
}: ClassStyle & { type: BlockType }) {
  
  const src = mapBlockUiTypeToSrc(type)
  
  return (
    <img css={blockStyle} src={src} {...rest}/>
  )
}



const blockStyle = {
  width: '100%',
  height: 'auto',
  aspectRatio: '1',
  objectPosition: 'center',
  objectFit: 'cover',
}
