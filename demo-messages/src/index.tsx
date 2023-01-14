import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './routes/__layout'
import CONFIG from './config'
import { PluginManager } from '@uncover/ward'

PluginManager.loadPlugin(CONFIG.WARD_DEMO_MESSAGES_PLUGIN)
  .then(() => {
    const containerRoot = document.getElementById('reactroot')!
    const root = createRoot(containerRoot)
    root.render(
      <Root />
    )
  })
