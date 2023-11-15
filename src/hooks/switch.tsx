import Component from '../types/Component'
import React, { ReactElement, useMemo } from 'react'
import SwitchableComponentContext from '../components/SwitchableComponentContext'
import SwitchableManager from '../classes/SwitchableManager'

type SwitchableComponent<P extends object,CP> = Component<P,CP> & SwitchableManager<CP>

// Create a new component with the content of an specific Component (taking specific props)
function useSwitch<P extends object,CP>( Component:Component<P,CP>, delay=0 ): SwitchableComponent<P,CP> {
  const SwitchableComponent = useMemo( () => {
    const manager = new SwitchableManager<CP>()
    // Encapsulating Component to create a Context for custom hooks
    const ComponentToSwitch = ( props:P ): ReactElement => {
      return (
        <SwitchableComponentContext
          Component={ Component }
          componentProps={ props }
          manager={ manager }
          hidingDelay={ delay } />
      )
    }
    return Object.assign( ComponentToSwitch, manager )
  }, [ delay ] )
  return SwitchableComponent
}

export default useSwitch
export { SwitchableComponent }