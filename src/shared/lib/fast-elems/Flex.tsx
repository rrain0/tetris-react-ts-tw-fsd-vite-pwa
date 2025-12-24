import React, { type ComponentProps } from 'react'
import {
  type FlexViewShortStyle, processFlexViewShortStyle,
} from '@lib/short-style/view-processors/processFlexViewShortStyle.ts'



export type FlexProps = ComponentProps<'div'> & FlexViewShortStyle

export default function Flex(props: FlexProps) {
  
  const { flexCss, flexRest } = processFlexViewShortStyle(props)
  const { children, ...restProps } = flexRest
  
  return (
    <div
      data-display-name='Flex'
      {...restProps}
      // @ts-ignore
      css={{ display: 'flex', ...flexCss }}
    >
      {children}
    </div>
  )
}
