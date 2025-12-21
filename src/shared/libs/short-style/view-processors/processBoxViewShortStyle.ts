import {
  type ContentShortStyle, processContentShortStyle,
} from '@libs/short-style/processors/processContentShortStyle.ts'
import {
  type PlacedShortStyle, processPlacedShortStyle,
} from '@libs/short-style/processors/processPlacedShortStyle.ts'
import {
  type PointerShortStyle, processPointerShortStyle,
} from '@libs/short-style/processors/processPointerShortStyle.ts'
import {
  type PositionShortStyle, processPositionShortStyle,
} from '@libs/short-style/processors/processPositionShortStyle.ts'
import {
  processSizeShortStyle,
  type SizeShortStyle,
} from '@libs/short-style/processors/processSizeShortStyle.ts'
import {
  processTextShortStyle,
  type TextShortStyle,
} from '@libs/short-style/processors/processTextShortStyle.ts'




export type BoxViewShortStyle =
  & PointerShortStyle
  & PositionShortStyle
  & SizeShortStyle
  & PlacedShortStyle
  & ContentShortStyle
  & TextShortStyle

export function processBoxViewShortStyle<P extends object>(props: P & BoxViewShortStyle) {
  const { pointerCss, pointerRest } = processPointerShortStyle(props)
  const { positionCss, positionRest } = processPositionShortStyle(pointerRest)
  const { sizeCss, sizeRest } = processSizeShortStyle(positionRest)
  const { placedCss, placedRest } = processPlacedShortStyle(sizeRest)
  const { contentCss, contentRest } = processContentShortStyle(placedRest)
  const { textCss, textRest } = processTextShortStyle(contentRest)
  
  return {
    boxCss: { ...pointerCss, ...positionCss, ...sizeCss, ...placedCss, ...contentCss, ...textCss },
    boxRest: textRest,
  }
}



