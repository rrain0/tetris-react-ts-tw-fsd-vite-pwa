import React, { type ComponentProps } from 'react'
import {
  type BoxViewShortStyle, processBoxViewShortStyle,
} from '@lib/short-style/view-processors/processBoxViewShortStyle.ts'



export type ContentsProps = ComponentProps<'div'> & BoxViewShortStyle

export default function Contents(props: ContentsProps) {
  
  const { boxCss, boxRest } = processBoxViewShortStyle(props)
  const { children, ...restProps } = boxRest
  
  return (
    <div
      data-display-name='Contents'
      {...restProps}
      css={{ display: 'contents', ...boxCss }}
    >
      {children}
    </div>
  )
}
