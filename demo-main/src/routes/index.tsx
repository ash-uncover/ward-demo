import React from 'react'
// Components
import {
  Outlet
} from 'react-router-dom'
import {
  App
} from '../components/App'
import {
  WardDevTools,
  WardProvider
} from '@uncover/ward-react'

import CONFIG from '../config'

const RouteRoot = () => {

  // Hooks //


  // Rendering //

  return (
    <WardProvider plugin={CONFIG.WARD_DEMO_MAIN_PLUGIN}>
      <App>
        <Outlet />
      </App>
      <WardDevTools />
    </WardProvider>
  )
}

export default RouteRoot
