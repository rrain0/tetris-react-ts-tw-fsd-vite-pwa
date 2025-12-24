import { isstring } from '@utils/ts/tsBase.ts'
import {
  processBoxViewShortStyle,
} from '@lib/short-style/view-processors/processBoxViewShortStyle.ts'
import {
  processFlexViewShortStyle,
} from '@lib/short-style/view-processors/processFlexViewShortStyle.ts'
import {
  processGridViewShortStyle,
} from '@lib/short-style/view-processors/processGridViewShortStyle.ts'
import type { LayoutViewShortStyle } from '@lib/short-style/view-style/layoutStyle.ts'




export function processLayoutViewShortStyle<P extends object>(
  props: P & LayoutViewShortStyle
) {
  const { flex, grid, ...rest } = props
  
  if (grid === true || isstring(grid)) {
    const { gridCss, gridRest } = processGridViewShortStyle({
      ...rest, ...isstring(grid) && { grid },
    })
    return { layoutCss: gridCss, layoutRest: gridRest }
  }
  
  if (flex === true) {
    const { flexCss, flexRest } = processFlexViewShortStyle(rest)
    return { layoutCss: flexCss, layoutRest: flexRest }
  }
  
  const { boxCss, boxRest } = processBoxViewShortStyle(props)
  return { layoutCss: boxCss, layoutRest: boxRest }
}


/*
{
  function fun(p: LayoutViewShortStyle) {
    const as = processLayoutViewShortStyle(p)
  }
}

{
  const p: LayoutViewShortStyle = { }
  const ps = processLayoutViewShortStyle(p)
}
{
  const p = { } satisfies LayoutViewShortStyle
  const ps = processLayoutViewShortStyle(p)
}

const test = processLayoutViewShortStyle({
  flex: true,
  wrap: true,
  place: 'center',
})
const test2 = processLayoutViewShortStyle({
  grid: true,
  wrap: true,
  place: 'center',
})
*/
