import React, { useEffect, useState } from 'react'
// Libs
// Components
import Frame from './Frame'
import Service from './Service'
import MessageDispatcher from '@uncover/ward'

let SERVICE = 1
let FRAME = 1

interface AppProperties {
}

const App = ({
}: AppProperties) => {

  // Hooks //

  let id = 'TOP'
  let horizontal = false
  const params = new URLSearchParams(window.location.search)
  if (params.has('id')) {
    id = params.get('id')!
  }
  if (params.has('horizontal')) {
    horizontal = true
  }

  const [services, setServices] = useState<string[]>([])
  const [frames, setFrames] = useState<string[]>([])

  useEffect(() => {
    const addServiceBase = MessageDispatcher.addService
    MessageDispatcher.addService = (service: any) => {
      const result = addServiceBase(service)
      return result
    }
    const removeServiceBase = MessageDispatcher.removeService
    MessageDispatcher.removeService = (service: any) => {
      removeServiceBase(service)
    }
    MessageDispatcher.start(id)
    handleAddService()
  }, [])

  // Events //

  const handleAddService = () => {
    const serviceId = `${id}-S${SERVICE++}`
    setServices([...services, serviceId])
  }

  const handleStopService = (serviceId: string) => {
    setServices(services.filter(service => service !== serviceId))
  }

  const handleAddFrame = () => {
    setFrames([...frames, `${id}-F${FRAME++}`])
  }

  const handleCloseFrame = (frameId: string) => {
    setFrames(frames.filter(frame => frame !== frameId))
  }

  // Rendering //

  const isTop = window === window.top

  return (
    <div
      className='app'
      style={{
        width: '100%',
        height: '100%',
        border: '4px solid #222',
        background: '#DDD',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        className='app-toolbar'
        style={{
          flexShrink: 0,
          display: 'flex',
          padding: '10px',
          paddingTop: '5px',
          gap: '5px',
          background: '#222',
          color: '#EEE',
          alignItems: 'center'
        }}
      >
        <span style={{ marginRight: 'auto' }}>
          {id}
        </span>
        <button onClick={handleAddService}>
          Add Service
        </button>
        <button onClick={handleAddFrame}>
          Add Frame
        </button>
        {!isTop ?
          <button
            onClick={() => handleCloseFrame(id)}
            style={{
              marginRight: '20px'
            }}
          >
            X
          </button>
          : null}
      </div>

      <div
        className='app-content'
        style={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: horizontal ? 'column' : 'row',
          gap: '4px',
          padding: '4px',
          overflow: 'hidden'
        }}
      >
        <div
          className='app-services'
          style={{
            border: '1px solid #888',
            overflow: 'auto'
          }}
        >
          <div>#Services</div>
          <div
            style={{
              display: 'flex',
              flexDirection: horizontal ? 'row' : 'column'
            }}
          >
            {services.map((serviceId) => {
              return (
                <Service
                  key={serviceId}
                  id={serviceId}
                  onStop={() => handleStopService(serviceId)}
                />)
            })}
          </div>
        </div>
        <div
          className='app-frames'
          style={{
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
            border: '1px solid #888',
            padding: '4px',
            overflow: 'auto',
            minHeight: '300px'

          }}
        >
          <div>#Frames</div>
          <div
            style={{
              display: 'flex',
              flexGrow: 1,
              flexDirection: horizontal ? 'row' : 'column',
              gap: '4px',
            }}
          >
            {frames.map((frameId) => {
              return (
                <Frame
                  key={frameId}
                  id={frameId}
                  onClose={() => handleCloseFrame(frameId)}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

}

export default App
