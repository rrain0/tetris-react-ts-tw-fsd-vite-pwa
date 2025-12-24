import React, { type ComponentProps } from 'react'
import {
  type GridViewShortStyle, processGridViewShortStyle,
} from '@lib/short-style/view-processors/processGridViewShortStyle.ts'



export type GridProps = ComponentProps<'div'> & GridViewShortStyle

export default function Grid(props: GridProps) {
  
  const { gridCss, gridRest } = processGridViewShortStyle(props)
  const { children, ...restProps } = gridRest
  
  return (
    <div
      data-display-name='Grid'
      {...restProps}
      // @ts-ignore
      css={{ display: 'grid', ...gridCss }}
    >
      {children}
    </div>
  )
}
