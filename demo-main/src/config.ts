import { Logger } from '@uncover/js-utils-logger'
const LOGGER = new Logger('CONFIG')

const CONFIG: {
  WARD_DEMO_MAIN_PLUGIN: string
  WARD_DEMO_MAIN_PUBLIC: string
  WARD_DEMO_MAIN_ENVIRONMENT: string
} = {
  WARD_DEMO_MAIN_PLUGIN: 'http://localhost:27000/plugin.json',
  WARD_DEMO_MAIN_PUBLIC: '',
  WARD_DEMO_MAIN_ENVIRONMENT: 'local',
}

// Load config from env
try {
  // This cannot be factorized since webpack simply replace the full process.env.[property] strings
  if (process.env.WARD_DEMO_MAIN_PLUGIN) {
    CONFIG.WARD_DEMO_MAIN_PLUGIN = process.env.WARD_DEMO_MAIN_PLUGIN
  }
  if (process.env.WARD_DEMO_MAIN_PUBLIC) {
    CONFIG.WARD_DEMO_MAIN_PUBLIC = process.env.WARD_DEMO_MAIN_PUBLIC
  }
  if (process.env.WARD_DEMO_MAIN_ENVIRONMENT) {
    CONFIG.WARD_DEMO_MAIN_ENVIRONMENT = process.env.WARD_DEMO_MAIN_ENVIRONMENT
  }
} catch (error) {
  LOGGER.warn('Failed to load from process.env')
}

console.log('CONFIG')

Object.keys(CONFIG).forEach((confKey: string) => {
  // @ts-ignore
  console.log(` - ${confKey}: '${CONFIG[confKey]}'`)
})

export default CONFIG
