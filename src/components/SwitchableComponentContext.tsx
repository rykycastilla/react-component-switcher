import Component from '../types/Component'
import ContextProvider from './ContextProvider'
import React, { ReactElement, useEffect } from 'react'
import SwitchableComponent from './SwitchableComponent'
import SwitchableManager from '../classes/SwitchableManager'
import useVisbility from '../hooks/visibility'

interface SwitchableComponentContextProps<P extends object> {
  Component: Component<P>,
  props: P,
  manager: SwitchableManager,
  hidingDelay: number,
}

function SwitchableComponentContext<P extends object>( props:SwitchableComponentContextProps<P> ): ReactElement {
  const { Component, props:componentProps, manager, hidingDelay } = props
  const { hiding, rendering, setVisibility } = useVisbility( hidingDelay )
  useEffect( () => {
    // Declaring manager functions
    function show() {
      if( !rendering ) { setVisibility( true ) }
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
      <SwitchableComponent Component={ Component } props={ componentProps } rendering={ rendering } />
    </ContextProvider>
  )
}

export default SwitchableComponentContext