import {
  deployModeDefault,
  supportedDeployModes,
} from '../deployMode.ts'
import { assertNever } from '../../shared/utils/ts/ts.ts'



export type DeployIcons = {
  icon48: string
  icon64: string
  icon167: string
  icon180: string
  icon192: string
  icon192Maskable: string
  icon512: string
  icon512Maskable: string
}



export function getAppDeployIcons({ deployMode }: {
  // Types are not precise to provide default values
  deployMode: string,
}): DeployIcons {
  const m = supportedDeployModes.includes(deployMode) ? deployMode : deployModeDefault
  if (m === 'development') {
    const assetsPath = './src/static-dev/assets'
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
  if (m === 'staging') {
    const assetsPath = './src/static-stg/assets'
    return {
      icon48: `${assetsPath}/icon-stg-48.png`,
      icon64: `${assetsPath}/icon-stg-64.png`,
      icon167: `${assetsPath}/icon-stg-167.png`,
      icon180: `${assetsPath}/icon-stg-180.png`,
      icon192: `${assetsPath}/icon-stg-192.png`,
      icon192Maskable: `${assetsPath}/icon-stg-192-maskable.png`,
      icon512: `${assetsPath}/icon-stg-512.png`,
      icon512Maskable: `${assetsPath}/icon-stg-512-maskable.png`,
    }
  }
  if (m === 'production') {
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
  assertNever(m)
}
