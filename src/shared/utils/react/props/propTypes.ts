import React, { type ReactNode } from 'react'
import type { Pu } from '@utils/ts/ts.ts'



export type StylePropType = React.CSSProperties
export type ClassNamePropType = string
export type ChildrenPropType = ReactNode

export type StyleProp = Pu<{ style: StylePropType }>
export type ClassNameProp = Pu<{ className: ClassNamePropType }>
export type ChildrenProp = Pu<{ children: ChildrenPropType }>

// Short aliases
export type ClassStyle = ClassNameProp & StyleProp
export type Children = ChildrenProp
