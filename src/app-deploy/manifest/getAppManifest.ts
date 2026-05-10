import manifestBase from './manifest.base.json'
import { type ManifestOptions } from 'vite-plugin-pwa'



export type ManifestPart = Partial<ManifestOptions>



export function getAppManifest({
  deployMode, deployLocale,
  appName, appDescription,
  themeColor, bgColor,
  icon64,
  icon192, icon192Maskable, icon512, icon512Maskable,
}: {
  // Types are not precise to provide default values
  deployMode: string
  deployLocale: string
  appName: string
  appDescription: string
  themeColor: string
  bgColor: string
  icon64: string
  icon192: string
  icon192Maskable: string
  icon512: string
  icon512Maskable: string
}): ManifestPart {
  let manifest = manifestBase as ManifestPart
  manifest = applyPwaId(manifest, { deployMode, deployLocale })
  manifest = applyLocale(manifest, { deployLocale, appName, appDescription })
  manifest = applyColors(manifest, { themeColor, bgColor })
  manifest = applyIcons(manifest, { icon64, icon192, icon192Maskable, icon512, icon512Maskable })
  return manifest
}



function getPwaId(deployMode: string, deployLocale: string) {
  return `tetris-${deployMode}-react-${deployLocale}`
}

function applyPwaId(
  manifest: ManifestPart,
  { deployMode, deployLocale }: {
    deployMode: string
    deployLocale: string
  }
): ManifestPart {
  return { ...manifest, id: getPwaId(deployMode, deployLocale) }
}

function applyLocale(
  manifest: ManifestPart,
  { deployLocale, appName, appDescription }: {
    deployLocale: string
    appName: string
    appDescription: string
  }
): ManifestPart {
  return {
    ...manifest,
    lang: deployLocale,
    name: appName,
    short_name: appName,
    description: appDescription,
  }
}

function applyColors(
  manifest: ManifestPart,
  { themeColor, bgColor }: {
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
