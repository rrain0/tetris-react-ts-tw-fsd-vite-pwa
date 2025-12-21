import * as React from 'react'
import AppCss from '@app/App/parts/AppCss.tsx'
import AppCssLayers from '@app/App/parts/AppCssLayers.tsx'
import AppSetup from '@app/App/parts/AppSetup.tsx'



export default function App() {
  return (
    <AppCssLayers>
      <AppCss>
        <AppSetup/>
      </AppCss>
    </AppCssLayers>
  )
}
