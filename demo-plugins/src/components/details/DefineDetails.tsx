import React from 'react'
import { Link } from 'react-router-dom'

import './DefineDetails.css'
import { usePlugin } from '@uncover/ward-react'

export interface DefineDetailsProperties {
  pluginId: string
  selectedPluginId?: string
}

export const DefineDetails = ({
  pluginId,
  selectedPluginId
}: DefineDetailsProperties) => {

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
              <DefineDetails
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