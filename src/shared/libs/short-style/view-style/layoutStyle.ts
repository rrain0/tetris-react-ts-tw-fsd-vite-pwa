import {
  isstring,
  type ObjectShallowPropsUnion,
  type Pu,
} from '@utils/ts/tsBase.ts'
import type {
  FlexViewShortStyle
} from '@libs/short-style/view-processors/processFlexViewShortStyle.ts'
import { boxStyle } from '@libs/short-style/view-style/boxStyle.ts'
import { flexStyle } from '@libs/short-style/view-style/flexStyle.ts'
import { gridStyle } from '@libs/short-style/view-style/gridStyle.ts'
import type {
  BoxViewShortStyle
} from '@libs/short-style/view-processors/processBoxViewShortStyle.ts'
import type {
  GridViewShortStyle
} from '@libs/short-style/view-processors/processGridViewShortStyle.ts'




export type LayoutViewShortStyle = ObjectShallowPropsUnion<
  Pu<{ flex: boolean, grid: boolean }>, ObjectShallowPropsUnion<
    BoxViewShortStyle, ObjectShallowPropsUnion<
      FlexViewShortStyle,
      GridViewShortStyle
    >
  >
>



export function layoutStyle<P extends object>(
  props: P & LayoutViewShortStyle
) {
  const { flex, grid, ...rest } = props
  if (grid === true || isstring(grid)) {
    return gridStyle({ ...rest, flex, ...isstring(grid) && { grid } })
  }
  if (flex === true) {
    return flexStyle(rest)
  }
  return boxStyle(props)
}


/*
const test = layoutStyle({
  flex: true,
  wrap: true,
  place: 'center',
})
const test2 = layoutStyle({
  grid: true,
  wrap: true,
  place: 'center',
})
*/
