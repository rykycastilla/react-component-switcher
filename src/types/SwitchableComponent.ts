import Component from './Component'
import { SwitchableManager } from '../classes/SwitchableManager'

type SwitchableComponent<P extends object,CP> = Component<P,CP> & SwitchableManager<CP>

export default SwitchableComponent