import React from 'react'

import { usePluginsRoot } from '@uncover/ward-react'
import { PluginSideEntry } from './PluginSideEntry'

interface PluginSideEntriesProperties {
  pluginId?: string
}

const PluginSideEntries = ({
  pluginId
}: PluginSideEntriesProperties) => {

  // Hooks //

  const rootPlugins = usePluginsRoot()

  // Events //


  // Rendering //

  return (
    <>
      <h3>
        Plugin list
      </h3>

      <ul>
        {Object.values(rootPlugins).map(plugin => {
          return (
            <PluginSideEntry
              key={plugin.name}
              selectedPluginId={pluginId}
              pluginId={plugin.name}
            />
          )
        })}
      </ul>

    </>
  )
}

export default PluginSideEntries