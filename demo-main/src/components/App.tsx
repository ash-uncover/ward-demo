import React, { ReactNode } from 'react'
// Hooks
import {
  WardElement,
  useWardProviders,
  useWardProvider
} from '@uncover/ward-react'
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

  const viewers = useWardProviders('ward-demo/viewers') || []

  return (
    <div className='app'>
      <div className='app__header'>
        <Link
          to={`/`}
        >
          WARD
        </Link>
        {viewers.map((viewer) => {
          return (
            <Link
              key={String(viewer.attributes.id)}
              to={`/${String(viewer.attributes.id)}`}
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
