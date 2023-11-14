import Component from '../types/Component'
import ContextProvider from './ContextProvider'
import React, { ReactElement, useEffect, useState } from 'react'
import SwitchableComponent from './SwitchableComponent'
import SwitchableManager from '../classes/SwitchableManager'
import useVisbility from '../hooks/visibility'

interface SwitchableComponentContextProps<P extends object,CP> {
  Component: Component<P,CP>,
  props: P,
  manager: SwitchableManager<CP>,
  hidingDelay: number,
}

function SwitchableComponentContext<P extends object,CP>( props:SwitchableComponentContextProps<P,CP> ): ReactElement {
  const { Component, props:componentProps, manager, hidingDelay } = props
  const { hiding, rendering, setVisibility } = useVisbility( hidingDelay )
  const [ callerProps, setCallerProps ] = useState( undefined as CP )
  useEffect( () => {
    // Declaring manager functions
    function show( callerProps?:CP ) {
      if( !rendering ) {
        setCallerProps( callerProps as CP )
        setVisibility( true )
      }
    }
    function hide() {
      if( rendering ) { setVisibility( false ) }
    }
    function getRendering(): boolean {
      return rendering
    }
    // Using functions as methods of the manager (to make them public)
    SwitchableManager.use( manager, { show, hide, getRendering } )
  }, [ hiding, rendering ] )
  return (
    <ContextProvider hiding={ hiding }>
      <SwitchableComponent
        Component={ Component }
        props={ componentProps }
        callerProps={ callerProps }
        rendering={ rendering } />
    </ContextProvider>
  )
}

export default SwitchableComponentContext