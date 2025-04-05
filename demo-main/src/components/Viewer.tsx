import React from 'react'
import {
  WardElement,
  useWardProvider,
} from '@sol.ac/ward-react'

export interface ViewerProperties {
  viewerId: string
}

export const Viewer = ({
  viewerId
}: ViewerProperties) => {

  // Rendering //

  const viewer = useWardProvider(`ward-demo/viewers/${viewerId}`)

  if (!viewer) {
    return (
      <div>VIEWER NOT LOADED</div>
    )
  }

  const element = viewer.elements.viewer

  return (
    <WardElement
      key={viewerId}
      element={element}
    />
  )
}

