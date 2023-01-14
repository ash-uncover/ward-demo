import React, { ReactNode } from 'react'
// Hooks
import { useProviders } from '@uncover/ward-react'
// Components
import { Link } from 'react-router-dom'
// Style
import './App.css'

export interface AppProperties {
  children: ReactNode
}

export const App = ({
  children
}: AppProperties) => {

  // Hooks //

  // Events //

  // Rendering //

  const viewers = useProviders('ward-demo/viewers') || []

  return (
    <div className='app'>
      <div className='app__header'>
        <span>WARD</span>
        {viewers.map((viewer) => {
          return (
            <Link
              key={viewer.attributes.id}
              to={`/${viewer.attributes.id}`}
            >
              {viewer.attributes.name}
            </Link>
          )
        })}

      </div>

      <div className='app__content'>
        {children}
      </div>
    </div>
  )
}
