import React, { type ComponentProps } from 'react'
import {
  processLayoutViewShortStyle
} from '@lib/short-style/view-processors/processLayoutViewShortStyle.ts'
import type { LayoutViewShortStyle } from '@lib/short-style/view-style/layoutStyle.ts'



export type DivProps = ComponentProps<'div'> & LayoutViewShortStyle

export default function Div({ children, ...props }: DivProps) {
  
  const { layoutCss, layoutRest: rest } = processLayoutViewShortStyle(props)
  
  return (
    <div
      data-display-name='Div'
      {...rest}
      css={layoutCss}
    >
      {children}
    </div>
  )
}
