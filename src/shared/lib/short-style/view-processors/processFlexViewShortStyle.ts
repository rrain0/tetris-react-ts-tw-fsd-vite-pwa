import {
  type FlexShortStyle,
  processFlexShortStyle,
} from '@lib/short-style/processors/processFlexShortStyle.ts'
import {
  type BoxViewShortStyle, processBoxViewShortStyle,
} from '@lib/short-style/view-processors/processBoxViewShortStyle.ts'



export type FlexViewShortStyle =
  & BoxViewShortStyle
  & FlexShortStyle

export function processFlexViewShortStyle<P extends object>(props: P & FlexViewShortStyle) {
  const { boxCss, boxRest } = processBoxViewShortStyle(props)
  const { flexCss, flexRest } = processFlexShortStyle(boxRest)
  
  return {
    flexCss: { ...boxCss, display: 'flex', ...flexCss },
    flexRest,
  }
}



