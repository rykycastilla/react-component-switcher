import Component from '../types/Component'
import React, { ReactElement } from 'react'

interface SwitchableComponentProps<P extends object> {
  Component: Component<P>,
  props: P,
  rendering: boolean,
}

function SwitchableComponent<P extends object>( props:SwitchableComponentProps<P> ): ReactElement {
  const { Component, props:componentProps, rendering } = props
  return rendering ? Component( componentProps ) : <></>
}

export default SwitchableComponent