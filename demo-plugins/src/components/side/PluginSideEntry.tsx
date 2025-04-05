import React from 'react'
import { Link } from 'react-router-dom'
// Libs
import {
  useWardPlugin,
  useWardPlugins
} from '@sol.ac/ward-react'
import Plugin from '@sol.ac/ward/dist/plugin/object/Plugin'
// Styles
import './PluginSideEntry.css'

export interface PluginSideEntryProperties {
  pluginId: string
  selectedPluginId?: string
}

export const PluginSideEntry = ({
  pluginId,
  selectedPluginId
}: PluginSideEntryProperties) => {

  // Rendering //

  const plugin = useWardPlugin(pluginId)
  const plugins = useWardPlugins()

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
            const dependencyName = Object.values(plugins).find((p: Plugin) => p.loadUrl === dependency)?.name
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