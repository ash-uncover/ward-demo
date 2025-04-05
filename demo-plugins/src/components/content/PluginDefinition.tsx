import React from 'react'
// Hooks
import { useWardDefinition } from '@sol.ac/ward-react'
// Styles
import './PluginDefinition.css'

export interface PluginDefinitionProperties {
  definitionId: string
}

export const PluginDefinition = ({
  definitionId
}: PluginDefinitionProperties) => {

  // Rendering //

  const definition = useWardDefinition(definitionId)

  if (!definition) {
    return (
      <li>PROBLEM</li>
    )
  }

  return (
    <li>
      {definition.name}
    </li>
  )
}