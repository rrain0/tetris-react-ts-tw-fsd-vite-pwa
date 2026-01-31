import * as React from 'react'
import AppCss from '@app/App/parts/AppCss.tsx'
import AppCssLayers from '@app/App/parts/AppCssLayers.tsx'
import AppContainer from 'app/App/parts/AppContainer.tsx'



export default function App() {
  return (
    <AppCssLayers>
      <AppCss>
        <AppContainer/>
      </AppCss>
    </AppCssLayers>
  )
}
