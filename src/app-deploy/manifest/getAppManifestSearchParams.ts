


export function getAppManifestSearchParams({ deployMode, locale, theme }: {
  deployMode: string
  locale: string
  theme: string
}) {
  let manifestSearchParams = new URLSearchParams({ deployMode, locale, theme }).toString()
  if (manifestSearchParams) manifestSearchParams = '?' + manifestSearchParams
  return manifestSearchParams
}
