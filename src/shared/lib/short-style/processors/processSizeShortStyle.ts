import { isdef, type Pu } from '@utils/ts/ts.ts'




export type SizeShortStyle = Pu<{
  boxSizing: string // { boxSizing }
  contentBox: boolean // true => { boxSizing: 'content-box' }
  borderBox: boolean // true => { boxSizing: 'border-box' }
  
  
  // 'full' => '100%'
  // 'ct' => 'fit-content'
  w: number | string | 'full' | 'ct' // { width }
  h: number | string | 'full' | 'ct' // { height }
  sz: number | string | 'full' | 'ct' // { width, height }
  size: number | string | 'full' | 'ct' // { width, height }
  
  wMin: number | string | 'full' // { minWidth }
  hMin: number | string | 'full' // { minHeight }
  szMin: number | string | 'full' // { minWidth, minHeight }
  sizeMin: number | string | 'full' // { minWidth, minHeight }
  
  wMax: number | string | 'full' // { maxWidth }
  hMax: number | string | 'full' // { maxHeight }
  szMax: number | string | 'full' // { maxWidth, maxHeight }
  sizeMax: number | string | 'full' // { maxWidth, maxHeight }
  
  wFull: boolean // true => { width: '100%' }
  hFull: boolean // true => { height: '100%' }
  full: boolean // true => { width: '100%', height: '100%' }
  szFull: boolean // true => { width: '100%', height: '100%' }
  sizeFull: boolean // true => { width: '100%', height: '100%' }
  
  wMinFull: boolean // true => { minWidth: '100%' }
  hMinFull: boolean // true => { minHeight: '100%' }
  
  wMaxFull: boolean // true => { maxWidth: '100%' }
  hMaxFull: boolean // true => { maxHeight: '100%' }
  szMaxFull: boolean // true => { maxWidth: '100%', maxHeight: '100%' }
  
  wCt: boolean // true => { width: 'fit-content' }
  hCt: boolean // true => { height: 'fit-content' }
  szCt: boolean // true => { width: 'fit-content', height: 'fit-content' }
  sizeCt: boolean // true => { width: 'fit-content', height: 'fit-content' }
  
  wMin0: boolean // true => { minWidth: 0 }
  hMin0: boolean // true => { minHeight: 0 }
  szMin0: boolean // true => { minWidth: 0, minHeight: 0 }
  
  ratio: number | string // => { aspectRatio: ratio }
  rad: number | string // => { borderRadius: rad }
  
  square: number | string // => { aspectRatio: 1 }
  round: boolean // true => { borderRadius: 999999 }
  
  // margins
  m: number | string // { margin }
  mv: number | string // { marginTop, marginBottom }
  mh: number | string // { marginLeft, marginRight }
  mt: number | string // { marginTop }
  mr: number | string // { marginRight }
  mb: number | string // { marginBottom }
  ml: number | string // { marginLeft }
  // paddings
  p: number | string // { padding }
  pv: number | string // { paddingTop, paddingBottom }
  ph: number | string // { paddingLeft, paddingRight }
  pt: number | string // { paddingTop }
  pr: number | string // { paddingRight }
  pb: number | string // { paddingBottom }
  pl: number | string // { paddingLeft }
}>



export const processSizeShortStyle = <P extends object>(
  props: P & SizeShortStyle
) => {
  const {
    boxSizing, contentBox, borderBox,
    
    w, h, sz, size = sz,
    wMin, hMin, sizeMin, szMin = sizeMin,
    wMax, hMax, sizeMax, szMax = sizeMax,
    
    wFull, hFull, full, sizeFull = full, szFull = sizeFull,
    wMinFull, hMinFull,
    wMaxFull, hMaxFull, szMaxFull,
    wCt, hCt, szCt, sizeCt = szCt,
    wMin0, hMin0, szMin0,
    
    ratio, rad, square, round,
    m, mv, mh, mt, mr, mb, ml,
    p, pv, ph, pt, pr, pb, pl,
    ...sizeRest
  } = props
  
  
  
  
  
  const sizeCss = {
    ...contentBox && { boxSizing: 'content-box' },
    ...borderBox && { boxSizing: 'border-box' },
    ...isdef(boxSizing) && { boxSizing: boxSizing },
    
    ...szFull && { width: '100%', height: '100%' },
    
    ...szMaxFull && { maxWidth: '100%', maxHeight: '100%' },
    
    ...szCt && { width: 'fit-content', height: 'fit-content' },
    
    ...szMin0 && { minWidth: 0, minHeight: 0 },
    
    ...isdef(sz) && { width: processAnySz(sz), height: processAnySz(sz) },
    ...isdef(szMin) && { minWidth: processAnySz(szMin), minHeight: processAnySz(szMin) },
    ...isdef(szMax) && { maxWidth: processAnySz(szMax), maxHeight: processAnySz(szMax) },
    
    ...wFull && { width: '100%' },
    ...hFull && { height: '100%' },
    ...wMinFull && { minWidth: '100%' },
    ...hMinFull && { minHeight: '100%' },
    ...wMaxFull && { maxWidth: '100%' },
    ...hMaxFull && { maxHeight: '100%' },
    
    ...wCt && { width: 'fit-content' },
    ...hCt && { height: 'fit-content' },
    
    ...wMin0 && { minWidth: 0 },
    ...hMin0 && { minHeight: 0 },
    
    ...isdef(w) && { width: processAnySz(w) },
    ...isdef(h) && { height: processAnySz(h) },
    ...isdef(wMin) && { minWidth: processAnySz(wMin) },
    ...isdef(hMin) && { minHeight: processAnySz(hMin) },
    ...isdef(wMax) && { maxWidth: processAnySz(wMax) },
    ...isdef(hMax) && { maxHeight: processAnySz(hMax) },
    
    ...square && { aspectRatio: square },
    ...round && { borderRadius: 999999 },
    
    ...isdef(ratio) && { aspectRatio: ratio },
    ...isdef(rad) && { borderRadius: rad },
    
    ...isdef(m) && { margin: m },
    ...isdef(mv) && { marginTop: mv, marginBottom: mv },
    ...isdef(mh) && { marginLeft: mh, marginRight: mh },
    ...isdef(mt) && { marginTop: mt },
    ...isdef(mr) && { marginRight: mr },
    ...isdef(mb) && { marginBottom: mb },
    ...isdef(ml) && { marginLeft: ml },
    
    ...isdef(p) && { padding: p },
    ...isdef(pv) && { paddingTop: pv, paddingBottom: pv },
    ...isdef(ph) && { paddingLeft: ph, paddingRight: ph },
    ...isdef(pt) && { paddingTop: pt },
    ...isdef(pr) && { paddingRight: pr },
    ...isdef(pb) && { paddingBottom: pb },
    ...isdef(pl) && { paddingLeft: pl },
  }
  
  return { sizeCss, sizeRest }
}



const processAnySz = (sz?: number | string | 'full' | 'ct') => {
  if (sz === 'full') return '100%'
  if (sz === 'ct') return 'fit-content'
  return sz
}
