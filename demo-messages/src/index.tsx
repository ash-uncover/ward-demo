import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './routes/__layout'
import { WardProvider } from '@sol.ac/ward-react'

const containerRoot = document.getElementById('reactroot')!
const root = createRoot(containerRoot)

root.render(
  <WardProvider plugin='http://localhost:27001/plugin.json'>
    <Root />
  </WardProvider>
)
