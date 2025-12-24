import {
  type BoxViewShortStyle, processBoxViewShortStyle,
} from '@lib/short-style/view-processors/processBoxViewShortStyle.ts'



export function boxStyle<S extends object>(style: S & BoxViewShortStyle) {
  const { boxCss, boxRest } = processBoxViewShortStyle(style)
  return { ...boxCss, ...boxRest }
}
