import { ReactElement } from 'react'

export type Component<P> = ( props:P ) => ReactElement
export type CallFunction<CP> = ( callerProps?:CP ) => void
export type HideFunction = () => void
export type ComponentToSwitch<P,CP> = ( props:P, callerProps:CP, id:number ) => ReactElement

export interface SwitchableComponent<P,CP> {
  Component: Component<P>,
  call: CallFunction<CP>,
  hide: HideFunction,
  showing: boolean,
}

// Create a new component with the content of an specific Component (taking specific props)
export function encapsulate<P,CP>( Component:ComponentToSwitch<P,CP>, callerProps:CP, id:number ): Component<P> {
  return ( props:P ): ReactElement => Component( props, callerProps, id )
}