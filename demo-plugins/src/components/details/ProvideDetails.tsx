import React from 'react'
import { Link } from 'react-router-dom'
// Libs
import { useWardPlugin } from '@uncover/ward-react'
// Styles
import './ProvideDetails.css'

export interface ProvideDetailsProperties {
  pluginId: string
  selectedPluginId?: string
}

export const ProvideDetails = ({
  pluginId,
  selectedPluginId
}: ProvideDetailsProperties) => {

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
        {(plugin.dependencies || [])
          .map(dependency => {
            return (
              <ProvideDetails
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