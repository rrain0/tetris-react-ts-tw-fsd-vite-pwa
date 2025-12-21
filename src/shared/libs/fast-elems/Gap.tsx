import React, { type ComponentProps } from 'react'
import {
  type BoxViewShortStyle, processBoxViewShortStyle,
} from '@libs/short-style/view-processors/processBoxViewShortStyle.ts'



export type GapProps = ComponentProps<'div'> & BoxViewShortStyle

export default function Gap(props: GapProps) {
  
  const { boxCss, boxRest } = processBoxViewShortStyle(props)
  const { children, ...restProps } = boxRest
  
  return (
    <div
      data-display-name='Gap'
      {...restProps}
      css={boxCss}
    >
      {children}
    </div>
  )
}
