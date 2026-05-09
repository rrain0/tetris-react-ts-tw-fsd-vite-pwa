import type { ObjectValue } from '@@/utils/object/objectTypes.ts'
import appMetaByLang from './app-meta-by-lang.json'



type AppMeta = ObjectValue<typeof appMetaByLang>

const defaultLang = 'en-US'
export const appMetaSupportedLangs = Object.keys(appMetaByLang)

export function getAppMeta({
  buildMode, buildLang,
}: {
  buildMode: string
  buildLang: string
}) {
  const byLang = appMetaByLang as Record<string, AppMeta>
  if (!appMetaSupportedLangs.includes(buildLang)) return undefined
  const appMeta = byLang[buildLang]
  
  return processAppMeta(appMeta, buildMode)
}

export function getAppMetaOrDefault({
  buildMode, buildLang,
}: {
  buildMode: string
  buildLang: string
}) {
  const byLang = appMetaByLang as Record<string, AppMeta>
  if (!appMetaSupportedLangs.includes(buildLang)) buildLang = defaultLang
  const appMeta = byLang[buildLang]
  
  return processAppMeta(appMeta, buildMode)
}



function processAppMeta(appMeta: AppMeta, buildMode: string) {
  let { appLang, appName, appDescription } = appMeta
  
  if (buildMode === 'development') appName = 'Dev ' + appName
  
  return { appLang, appName, appDescription }
}
