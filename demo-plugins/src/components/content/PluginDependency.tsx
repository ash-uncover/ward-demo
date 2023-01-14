import React from 'react'
// Hooks
import { usePlugin } from '@uncover/ward-react'
// Components
import { Link } from 'react-router-dom'
// Styles
import './PluginDependency.css'

export interface PluginDependencyProperties {
  pluginId: string
}

export const PluginDependency = ({
  pluginId
}: PluginDependencyProperties) => {

  // Rendering //

  const plugin = usePlugin(pluginId)

  if (!plugin) {
    return (
      <li>PROBLEM</li>
    )
  }

  return (
    <li>
      <Link
        to={`/plugins/${window.btoa(encodeURIComponent(plugin.name))}`}
      >
       {plugin.name}
      </Link>
    </li>
  )
}