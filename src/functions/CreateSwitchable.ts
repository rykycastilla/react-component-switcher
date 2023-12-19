import Component from '../types/Component'
import ManagerReference from '../classes/ManagerReference'
import SwitchableComponent from '../types/SwitchableComponent'
import SwitchableComponentContext from '../components/SwitchableComponentContext' 
import SwitchableManager from '../classes/SwitchableManager'
import { ReactElement } from 'react'

function makeItSwitchable<P extends object,CP>( Component:Component<P,CP>, hidingDelay=0 ): SwitchableComponent<P,CP> {
  const componentName: string = Component.name
  const managerReference = new ManagerReference<CP>( componentName )
  // Building SwitchableComponent
  const ComponentToSwitch = ( props:P ): ReactElement => {
    const componentProps = props
    const contextProps = { Component, componentProps, managerReference, hidingDelay }
    return SwitchableComponentContext( contextProps )
  }
  // Assinging anager
  const manager = new SwitchableManager( managerReference )
  const SwitchableComponent: SwitchableComponent<P,CP> = Object.assign( ComponentToSwitch, manager )
  return SwitchableComponent
}

export default makeItSwitchable