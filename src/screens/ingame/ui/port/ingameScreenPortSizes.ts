


export const ingameScreenPortSizes = () => {
  const blockSz = 1.0
  
  const fieldBoxBdSz = 0.16
  const fieldBoxW = fieldBoxBdSz + 10 * blockSz + fieldBoxBdSz
  const fieldBoxH = fieldBoxBdSz + 20 * blockSz + fieldBoxBdSz
  
  const fullFieldBoxH = fieldBoxBdSz + 22 * blockSz
  
  const topH = 2 * blockSz - fieldBoxBdSz
  const topTitleH = 0.7
  const topTitleMl = 1 * blockSz
  
  const bottomG = 0.2
  const bottomH = bottomG + 0.5 * blockSz + bottomG + 0.5 * blockSz + bottomG
  const titleH = 0.5
  const digitH = 0.5
  const bottomTxG = 0.16
  
  const controlsIcSz = 1
  const controlsG = 0.3
  const controlsW = controlsIcSz + controlsG + controlsIcSz
  
  const gameW = fieldBoxW
  const gameH = topH + fieldBoxH + bottomH
  const gameRatio = gameW / gameH
  
  const h = (h: number) => `${h / gameH * 100 / gameRatio}cqw`
  
  return {
    blockSz,
    fieldBoxBdSz, fieldBoxW, fieldBoxH,
    fullFieldBoxH,
    topH, topTitleH, topTitleMl,
    bottomG, bottomH, titleH, digitH, bottomTxG,
    controlsIcSz, controlsG, controlsW,
    gameW, gameH, gameRatio,
    h,
  }
}
