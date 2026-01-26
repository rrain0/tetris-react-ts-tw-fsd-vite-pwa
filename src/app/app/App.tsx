import * as React from 'react'
import AppCss from '@app/App/parts/AppCss.tsx'
import AppCssLayers from '@app/App/parts/AppCssLayers.tsx'
import AppLogic from 'app/App/parts/AppLogic.tsx'



export default function App() {
  return (
    <AppCssLayers>
      <AppCss>
        <AppLogic/>
      </AppCss>
    </AppCssLayers>
  )
}
