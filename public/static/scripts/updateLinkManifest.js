


function updateLinkManifest() {
  const params = {
    // eslint-disable-next-line no-undef
    projectMode: envProjectMode,
    // eslint-disable-next-line no-undef,
    baseUrl: envBaseUrl,
  }
  
  
  const linkManifest = document.querySelector('html > head > link[rel=manifest]')
  linkManifest.href = (() => {
    const manifestSearchParams = new URLSearchParams({
      projectMode: params.projectMode,
    }).toString()
    
    let manifestUrl = params.baseUrl + 'manifest.json'
    if (manifestSearchParams) manifestUrl += '?' + manifestSearchParams
    
    return manifestUrl
  })()
}

updateLinkManifest()
