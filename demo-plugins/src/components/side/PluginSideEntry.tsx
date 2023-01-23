import React from 'react'
import { Link } from 'react-router-dom'

import './PluginSideEntry.css'
import { usePlugin, usePlugins } from '@uncover/ward-react'

export interface PluginSideEntryProperties {
  pluginId: string
  selectedPluginId?: string
}

export const PluginSideEntry = ({
  pluginId,
  selectedPluginId
}: PluginSideEntryProperties) => {

  // Rendering //

  const plugin = usePlugin(pluginId)
  const plugins = usePlugins()

  if (!plugin) {
    return (
      <li>PROBLEM</li>
    )
  }

  const classes = ['plugin-side-entry']
  if (selectedPluginId === pluginId) {
    classes.push('selected')
  }

  return (
    <li
      className={classes.join(' ')}
      title={plugin.url}
    >
      <Link
        to={`${window.btoa(encodeURIComponent(plugin.name))}`}
      >
        {plugin.name}
      </Link>
      <ul className='plugin-side-entry__entries'>
        {plugin.dependencies
          .map(dependency => {
            const dependencyName = Object.values(plugins).find(p => p.loadUrl === dependency)?.name
            return (
              <PluginSideEntry
                key={dependencyName}
                selectedPluginId={selectedPluginId}
                pluginId={dependencyName || ''}
              />
            )
          })}
      </ul>
    </li>
  )
}