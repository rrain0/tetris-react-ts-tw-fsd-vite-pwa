import {
  type GridShortStyle,
  processGridShortStyle,
} from '@lib/short-style/processors/processGridShortStyle.ts'
import {
  type BoxViewShortStyle, processBoxViewShortStyle,
} from '@lib/short-style/view-processors/processBoxViewShortStyle.ts'



export type GridViewShortStyle =
  & BoxViewShortStyle
  & GridShortStyle

export function processGridViewShortStyle<P extends object>(props: P & GridViewShortStyle) {
  const { boxCss, boxRest } = processBoxViewShortStyle(props)
  const { gridCss, gridRest } = processGridShortStyle(boxRest)
  
  return {
    gridCss: { ...boxCss, display: 'grid', ...gridCss },
    gridRest,
  }
}

