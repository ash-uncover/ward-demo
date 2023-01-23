import React from 'react'

import { useDefinitions } from '@uncover/ward-react'
import { DefinitionSideEntry } from './DefinitionSideEntry'

interface DefinitionSideEntriesProperties {
  pluginId?: string
}

const DefinitionSideEntries = ({
  pluginId
}: DefinitionSideEntriesProperties) => {

  // Hooks //

  const definitions = useDefinitions()

  // Events //


  // Rendering //

  return (
    <>
      <h3>
        Definitions
      </h3>

      <ul>
        {Object.values(definitions).map(definition => {
          return (
            <DefinitionSideEntry
              key={definition.name}
              selectedPluginId={pluginId}
              definitionId={definition.name}
            />
          )
        })}
      </ul>
    </>
  )
}

export default DefinitionSideEntries