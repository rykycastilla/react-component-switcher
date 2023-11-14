import Component from '../types/Component'
import React, { ReactElement } from 'react'

interface SwitchableComponentProps<P extends object,CP> {
  Component: Component<P,CP>,
  props: P,
  callerProps: CP,
  rendering: boolean,
}

function SwitchableComponent<P extends object,CP>( props:SwitchableComponentProps<P,CP> ): ReactElement {
  const { Component, props:componentProps, callerProps, rendering } = props
  return rendering ? Component( componentProps, callerProps ) : <></>
}

export default SwitchableComponent