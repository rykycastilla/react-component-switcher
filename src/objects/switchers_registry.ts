import { BooleanSetter } from '../types'

interface SwitchersRegistry {
  [ key:number ]: BooleanSetter
}

// It save "hiding state setters"
const switchersRegistry: SwitchersRegistry = {}

export default switchersRegistry