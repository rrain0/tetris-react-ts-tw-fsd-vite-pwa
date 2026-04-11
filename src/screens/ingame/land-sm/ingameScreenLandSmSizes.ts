


export const ingameScreenLandSmSizes = (nextFieldCols = 4) => {
  const blockSz = 1.0
  
  const fieldBoxBdSz = 0.16
  const fieldBoxW = fieldBoxBdSz + 10 * blockSz + fieldBoxBdSz
  const fieldBoxH = fieldBoxBdSz + 20 * blockSz + fieldBoxBdSz
  
  const sideW = 6 * blockSz
  const sideG = 0.35
  const nextW = nextFieldCols * blockSz
  const titleH = 0.8
  const digitH = 0.9
  
  const icSz = 1
  const icsG = 0.3
  const icsW = icSz + icsG + icSz
  
  const gameG = 0.5
  const gameW = fieldBoxW + gameG + sideW + gameG + icsW
  const gameH = fieldBoxH
  const gameRatio = gameW / gameH
  
  const w = (w: number) => `${w / gameW * 100 * gameRatio}cqh`
  
  return {
    blockSz,
    fieldBoxBdSz, fieldBoxW, fieldBoxH,
    sideW, sideG, nextW, titleH, digitH,
    icSz, icsG, icsW,
    gameG, gameW, gameH, gameRatio,
    w,
  }
}
