import Component from '../types/Component'
import ContextProvider from './ContextProvider'
import React, { ReactElement, useState } from 'react'
import SwitchableComponent from './SwitchableComponent'
import ManagerCore from '../classes/ManagerCore'
import ManagerReference from '../classes/ManagerReference'
import useComponentName from '../hooks/component_name'
import useManager from '../hooks/manager'
import useUpdateRendering from '../hooks/update_rendering'
import useVisbility from '../hooks/visibility'

interface SwitchableComponentContextProps<P extends object,CP> {
  Component: Component<P,CP>,
  componentProps: P,
  managerReference: ManagerReference<CP>,
  hidingDelay: number,
}

const SwitchableComponentContext = <P extends object,CP>( props:SwitchableComponentContextProps<P,CP> ): ReactElement => {
  const { Component, componentProps, managerReference, hidingDelay } = props
  const { hiding, rendering, setVisibility } = useVisbility( hidingDelay )
  const [ callerProps, setCallerProps ] = useState( undefined as CP )
  // Teamwork with the manager
  const manager: ManagerCore<CP> = useManager( managerReference, { setVisibility, setCallerProps } )
  useComponentName( { Component, manager } )
  useUpdateRendering( manager, rendering )
  return (
    <ContextProvider hiding={ hiding } hide={ manager.hide }>
      <SwitchableComponent
        Component={ Component }
        componentProps={ componentProps }
        callerProps={ callerProps }
        rendering={ rendering } />
    </ContextProvider>
  )
}

export default SwitchableComponentContext