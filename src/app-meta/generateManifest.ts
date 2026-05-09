import manifestBase from './manifest.base.json'
import { type ManifestOptions } from 'vite-plugin-pwa'



export function generateManifest({
  buildMode,
  appLang, appName, appDescription,
  themeColor, bgColor,
  icon64,
  icon192, icon192Maskable, icon512, icon512Maskable,
}: {
  buildMode: string
  appLang: string
  appName: string
  appDescription: string
  themeColor: string
  bgColor: string
  icon64: string
  icon192: string
  icon192Maskable: string
  icon512: string
  icon512Maskable: string
}) {
  let manifest = manifestBase as ManifestPart
  manifest = applyPwaId(manifest, { buildMode, appLang })
  manifest = applyAppMeta(manifest, { appLang, appName, appDescription })
  manifest = applyAppColors(manifest, { themeColor, bgColor })
  manifest = applyIcons(manifest, { icon64, icon192, icon192Maskable, icon512, icon512Maskable })
  return manifest
}



type ManifestPart = Partial<ManifestOptions>

function getPwaId(buildMode: string, lang: string) {
  const project = 'tetris'
  const framework = 'react'
  return [project, buildMode, framework, lang].filter(it => !!it).join('-')
}

function applyPwaId(
  manifest: ManifestPart,
  {
    buildMode,
    appLang,
  }: {
    buildMode: string
    appLang: string
  }
): ManifestPart {
  return { ...manifest, id: getPwaId(buildMode, appLang) }
}

function applyAppMeta(
  manifest: ManifestPart,
  {
    appLang, appName, appDescription,
  }: {
    appLang: string
    appName: string
    appDescription: string
  }
): ManifestPart {
  return {
    ...manifest,
    lang: appLang,
    name: appName,
    short_name: appName,
    description: appDescription,
  }
}

function applyAppColors(
  manifest: ManifestPart,
  {
    themeColor, bgColor,
  }: {
    
    themeColor: string
    bgColor: string
  }
): ManifestPart {
  return {
    ...manifest,
    theme_color: themeColor,
    background_color: bgColor,
  }
}

function applyIcons(
  manifest: ManifestPart,
  {
    icon64,
    icon192, icon192Maskable, icon512, icon512Maskable,
  }: {
    icon64: string
    icon192: string
    icon192Maskable: string
    icon512: string
    icon512Maskable: string
  },
): ManifestPart {
  return {
    ...manifest,
    icons: [
      {
        src: icon64,
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: icon192,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: icon192Maskable,
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: icon512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: icon512Maskable,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
