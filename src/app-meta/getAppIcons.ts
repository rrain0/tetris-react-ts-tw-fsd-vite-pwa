


export function getAppIcons({ buildMode }: { buildMode: string }) {
  if (buildMode === 'development') {
    const assetsPath = './src/dev/static/assets'
    return {
      icon48: `${assetsPath}/icon-dev-48.png`,
      icon64: `${assetsPath}/icon-dev-64.png`,
      icon167: `${assetsPath}/icon-dev-167.png`,
      icon180: `${assetsPath}/icon-dev-180.png`,
      icon192: `${assetsPath}/icon-dev-192.png`,
      icon192Maskable: `${assetsPath}/icon-dev-192-maskable.png`,
      icon512: `${assetsPath}/icon-dev-512.png`,
      icon512Maskable: `${assetsPath}/icon-dev-512-maskable.png`,
    }
  }
  const assetsPath = './src/static/assets'
  return {
    icon48: `${assetsPath}/icon-48.png`,
    icon64: `${assetsPath}/icon-64.png`,
    icon167: `${assetsPath}/icon-167.png`,
    icon180: `${assetsPath}/icon-180.png`,
    icon192: `${assetsPath}/icon-192.png`,
    icon192Maskable: `${assetsPath}/icon-192-maskable.png`,
    icon512: `${assetsPath}/icon-512.png`,
    icon512Maskable: `${assetsPath}/icon-512-maskable.png`,
  }
}
