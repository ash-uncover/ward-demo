import React from 'react'
// Hooks
import { useDefinition } from '@uncover/ward-react'
// Styles
import './PluginDefinition.css'

export interface PluginDefinitionProperties {
  definitionId: string
}

export const PluginDefinition = ({
  definitionId
}: PluginDefinitionProperties) => {

  // Rendering //

  const definition = useDefinition(definitionId)

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