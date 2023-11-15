import Component from '../types/Component'
import { ReactElement } from 'react'

interface Content<P extends object,CP> {
  Component: Component<P,CP>,
  componentProps: P,
  callerProps: CP,
} 

interface KeyProviderProps<P extends object,CP> { content:Content<P,CP> }

// Allow to set a key prop to identify the "Component To Switch"
function KeyProvider<P extends object,CP>( props:KeyProviderProps<P,CP> ): ReactElement {
  const { content } = props
  const { Component, componentProps, callerProps } = content
  return Component( componentProps, callerProps )  // Rendering
}

export default KeyProvider