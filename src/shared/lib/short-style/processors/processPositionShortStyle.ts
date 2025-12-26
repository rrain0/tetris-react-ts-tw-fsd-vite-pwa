import { ifBool, isdef, type Pu } from '@utils/ts/ts.ts'




export type PositionShortStyle = Pu<{
  // { position }
  // 'rel' => { position: 'relative' }
  // 'abs' => { position: 'absolute }
  pos: string | 'rel' | 'abs'
  fixed: boolean // true => { position: 'fixed' }
  absolute: boolean // true => { position: 'absolute' }
  relative: boolean // true => { position: 'relative' }
  abs: boolean // true => { position: 'absolute' }
  // 'rel' уже занято html атрибутом
  rela: boolean // true => { position: 'relative' }
  
  t: boolean | number | string // true => { top: 0 } // => { top }
  r: boolean | number | string // true => { right: 0 } // => { right }
  b: boolean | number | string // true => { bottom: 0 } // => { bottom }
  l: boolean | number | string // true => { left: 0 } // => { left }
  z: number | string // => { zIndex }
  av: number | string // absolute vertical // => { top, bottom }
  ah: number | string // absolute horizontal // => { left, right }
  a: number | string // absolute all // => { top, right, bottom, left }
  
  // true => { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }
  fixedTrbl: boolean
  // true => { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }
  fixedTlwh: boolean
  // true => { position: 'fixed', top: 0, left: 0, right: 0 }
  fixedTop: boolean
  // true => { position: 'fixed', top: 0, left: 0, right: 0 }
  fixedLeft: boolean
  // true => { position: 'fixed', top: 0, left: 0, bottom: 0 }
  fixedBottom: boolean
  
  // true => { position: 'absolute', top: 0, left: 0 }
  absTl: boolean
  // true => { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }
  absTrbl: boolean
  // true => { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }
  absTlwh: boolean
}>



export const processPositionShortStyle = <P extends object>(
  props: P & PositionShortStyle
) => {
  const {
    pos, fixed, absolute, relative, abs, rela,
    t, r, b, l, z, av, ah, a,
    fixedTrbl, fixedTlwh, fixedTop, fixedLeft, fixedBottom,
    absTl, absTrbl, absTlwh,
    ...positionRest
  } = props
  
  
  
  const positionCss = {
    ...fixedTrbl && { position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 },
    ...fixedTlwh && { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' },
    ...fixedTop && { position: 'fixed', top: 0, left: 0, right: 0 },
    ...fixedLeft && { position: 'fixed', top: 0, left: 0, bottom: 0 },
    ...fixedBottom && { position: 'fixed', bottom: 0, left: 0, right: 0 },
    
    ...absTl && { position: 'absolute', top: 0, left: 0 },
    ...absTrbl && { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 },
    ...absTlwh && { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
    
    ...abs && { position: 'absolute' },
    ...rela && { position: 'relative' },
    ...fixed && { position: 'fixed' },
    ...absolute && { position: 'absolute' },
    ...relative && { position: 'relative' },
    
    ...isdef(pos) && {
      position: (() => {
        if (pos === 'rel') return 'relative'
        if (pos === 'abs') return 'absolute'
        return pos
      })(),
    },
    
    ...isdef(a) && { top: a, right: a, bottom: a, left: a },
    ...isdef(av) && { top: av, bottom: av },
    ...isdef(ah) && { right: ah, left: ah },
    
    ...isdef(t) && { top: ifBool(t, 0) },
    ...isdef(r) && { right: ifBool(r, 0) },
    ...isdef(b) && { bottom: ifBool(b, 0) },
    ...isdef(l) && { left: ifBool(l, 0) },
    ...isdef(z) && { zIndex: z },
  }
  
  return { positionCss, positionRest }
}


