import React from 'react'
import {
  WardElement,
  useProvider,
} from '@uncover/ward-react'

export interface ViewerProperties {
  viewerId: string
}

export const Viewer = ({
  viewerId
}: ViewerProperties) => {

  // Rendering //

  const viewer = useProvider(`ward-demo/viewers/${viewerId}`)

  if (!viewer) {
    return (
      <div>VIEWER NOT LOADED</div>
    )
  }
  console.log(viewer.elements)
  const element = viewer.elements.viewer

  return (
    <WardElement
      key={viewerId}
      element={element}
    />
  )
}

