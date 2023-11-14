import Component from '../types/Component'
import React, { ReactElement, useMemo } from 'react'
import SwitchableComponentContext from '../components/SwitchableComponentContext'
import SwitchableManager from '../classes/SwitchableManager'

type SwitchableComponent<P extends object> = Component<P> & SwitchableManager

// Create a new component with the content of an specific Component (taking specific props)
function useSwitch<P extends object>( Component:Component<P>, delay=0 ): SwitchableComponent<P> {
  const SwitchableComponent = useMemo( () => {
    const manager = new SwitchableManager()
    // Encapsulating Component to create a Context for custom hooks
    const ComponentToSwitch = ( props:P ): ReactElement => {
      return (
        <SwitchableComponentContext
          Component={ Component }
          props={ props }
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