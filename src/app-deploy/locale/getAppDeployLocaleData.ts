import {
  deployModeDefault,
  supportedDeployModes,
} from '../deployMode.ts'
import { appDeployLocalesData } from './appDeployLocalesData.ts'
import { assertNever } from '../../shared/utils/ts/ts.ts'



export const supportedDeployLocales = ['en-US'] as const
export type DeployLocale = typeof supportedDeployLocales[number]
export const deployLocaleDefault: DeployLocale = 'en-US'
export type DeployLocaleData = {
  appName: string
  appDescription: string
}



export function getAppDeployLocaleData({ deployMode, deployLocale }: {
  // Types are not precise to provide default values
  deployMode: string
  deployLocale: string
}): DeployLocaleData {
  const m = supportedDeployModes.includes(deployMode) ? deployMode : deployModeDefault
  const l = supportedDeployLocales.includes(deployLocale) ? deployLocale : deployLocaleDefault
  const deployLocaleData = { ...appDeployLocalesData[l] }
  
  deployLocaleData.appName = (() => {
    if (m === 'development') return '[Dev] ' + deployLocaleData.appName
    if (m === 'staging') return '[Stg] ' + deployLocaleData.appName
    if (m === 'production') return deployLocaleData.appName
    assertNever(m)
  })()
  
  return deployLocaleData
}
