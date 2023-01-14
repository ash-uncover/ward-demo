import React from 'react'
import { createRoot } from 'react-dom/client'

import CONFIG from './config'

import Root from './routes/__layout'
import { PluginManager } from '@uncover/ward'

PluginManager.loadPlugin(CONFIG.WARD_DEMO_PLUGINS_PLUGIN)

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)
root.render(
  <Root />
)
