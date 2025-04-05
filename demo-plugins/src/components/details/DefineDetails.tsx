import React from 'react'
// Hooks
import { useWardPlugin } from '@sol.ac/ward-react'
// Components
import { Link } from 'react-router-dom'
// Styles
import './DefineDetails.css'

export interface DefineDetailsProperties {
  pluginId: string
  selectedPluginId?: string
}

export const DefineDetails = ({
  pluginId,
  selectedPluginId
}: DefineDetailsProperties) => {

  // Rendering //

  const plugin = useWardPlugin(pluginId)

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
                key={dependency}
                selectedPluginId={selectedPluginId}
                pluginId={dependency}
              />
            )
          })}
      </ul>
    </li>
  )
}