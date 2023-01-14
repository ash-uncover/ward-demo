import React from 'react'
import { Link } from 'react-router-dom'

import './PluginSideEntry.css'
import { usePlugin } from '@uncover/ward-react'

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
            return (
              <PluginSideEntry
                key={dependency.name}
                selectedPluginId={selectedPluginId}
                pluginId={dependency.name}
              />
            )
          })}
      </ul>
    </li>
  )
}