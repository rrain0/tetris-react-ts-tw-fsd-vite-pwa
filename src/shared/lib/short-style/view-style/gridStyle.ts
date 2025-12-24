import {
  type GridViewShortStyle, processGridViewShortStyle,
} from '@lib/short-style/view-processors/processGridViewShortStyle.ts'



export function gridStyle<S extends object>(style: S & GridViewShortStyle) {
  const { gridCss, gridRest } = processGridViewShortStyle(style)
  return { ...gridCss, ...gridRest }
}
