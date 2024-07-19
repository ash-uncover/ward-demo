import React, {
  FormEvent,
  ReactNode,
  useEffect,
  useState,
} from 'react'
// Libs
import {
  WardProvider,
  useWardPlugins
} from '@uncover/ward-react'
import Plugin from '@uncover/ward/dist/plugin/object/Plugin'
// Components
import PluginSideEntries from './side/PluginSideEntries'
import DefinitionSideEntries from './side/DefinitionSideEntries'
// Styles
import './App.css'

interface AppProperties {
  pluginId?: string
  children: ReactNode
}

const App = ({
  pluginId,
  children
}: AppProperties) => {

  // Hooks //

  const plugins = useWardPlugins()

  const [newPluginUrl, setNewPluginUrl] = useState<string>('')

  const [plugin, setPlugin] = useState('http://localhost:27000/plugin.json')

  // Events //

  const handleNewPluginUrlChange = (event: FormEvent<HTMLInputElement>) => {
    setNewPluginUrl(event.currentTarget.value)
  }

  const handleSetPlugin = (event: FormEvent<HTMLButtonElement>) => {
    event.preventDefault()
    if (newPluginUrl && !Object.values(plugins).some((plugin: Plugin) => plugin.url === newPluginUrl)) {
      setPlugin(newPluginUrl)
      setNewPluginUrl('')
    }
  }

  // Rendering //

  return (
    <WardProvider
      plugin={plugin}
    >

      <div className='plugins'>

        <div className='plugins__side_panel'>

          <h2>
            Plugins
          </h2>

          <h3>
            Set plugin
          </h3>

          <form>
            <div>
              <input
                value={newPluginUrl}
                onChange={handleNewPluginUrlChange}
              />
            </div>
            <div>
              <button
                role='submit'
                onClick={handleSetPlugin}>
                Set
              </button>
            </div>
          </form>

          <PluginSideEntries pluginId={pluginId} />

          <DefinitionSideEntries />

        </div>

        <div className='plugins__details'>
          {children}
        </div>

      </div>
    </WardProvider>
  )
}

export default App