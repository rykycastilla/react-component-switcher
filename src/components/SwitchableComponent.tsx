import Component from '../types/Component'
import KeyProvider from './KeyProvider'
import React, { ReactElement } from 'react'

interface SwitchableComponentProps<P extends object,CP> {
  Component: Component<P,CP>,
  componentProps: P,
  callerProps: CP,
  rendering: boolean,
}

// Create or destroy a new Switchable Component instance
function SwitchableComponent<P extends object,CP>( props:SwitchableComponentProps<P,CP> ): ReactElement {
  const { Component, componentProps, callerProps, rendering } = props
  const content = { Component, componentProps, callerProps }
  return rendering
    ? <KeyProvider key={ 1 } content={ content } />
    : <></>
}

export default SwitchableComponent