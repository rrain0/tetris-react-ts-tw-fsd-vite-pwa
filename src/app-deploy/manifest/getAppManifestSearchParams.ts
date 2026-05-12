


export function getAppManifestSearchParams({ deployMode, locale, theme }: {
  deployMode: string
  locale: string
  theme: string
}) {
  let manifestSearchParams = new URLSearchParams({
    ...deployMode && { deployMode },
    ...locale && { locale },
    ...theme && { theme },
  }).toString()
  if (manifestSearchParams) manifestSearchParams = '?' + manifestSearchParams
  return manifestSearchParams
}
