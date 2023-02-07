import React from 'react'
// Hooks
import { useWardProvider } from '@uncover/ward-react'
// Styles
import './PluginProvider.css'

export interface PluginProviderProperties {
  providerId: string
}

export const PluginProvider = ({
  providerId
}: PluginProviderProperties) => {

  // Rendering //

  const provider = useWardProvider(providerId)

  if (!provider) {
    return (
      <li>{`PROBLEM - ${providerId}`}</li>
    )
  }

  return (
    <li>
      {provider.name}
    </li>
  )
}