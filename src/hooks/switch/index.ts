import { BooleanSetter } from '../../types'
import { Component, ComponentToSwitch, encapsulate, SwitchableComponent } from './switchable_component'
import Empty from '../../components/Empty'
import getBigNumber from '../../scripts/get_big_number'
import { useMemo, useState } from 'react'
import switchersRegistry from '../../objects/switchers_registry'

// Hook: receive a single Component and return a "Switchable" object to use it and handle its visibility on screen
// The generic type CP is for CallerProps
function useSwitch<P,CP>( DefaultComponent:ComponentToSwitch<P,CP>, wait=0 ): SwitchableComponent<P,CP> {
  const [ showComponent, setShowComponent ] = useState( false )
  const [ callerProps, setCallerProps ] = useState( null as CP )
  // Building an ID for "SwitchableComponent"
  const switcherID = useMemo( () => {
    let id: number
    while( true ) {
      id = getBigNumber()
      // if this "id" does not exist, stop trying
      if( !switchersRegistry[ id ] ) { break }
    }
    return id
  }, [] )
  // Building "Switchable" object (only changes when with "showComponent" and "CallerProps" state )
  const Switchable = useMemo( (): SwitchableComponent<P,CP> => {
    // Show "SwitchableComponent" and take "CallerProps" as "Component Props"
    function call( callerProps:CP ) {
      if( !showComponent ) {
      setCallerProps( callerProps )
      setShowComponent( true )
      }
      else { throw( 'You can not call the Switchable Component if this is on Display' ) }
    }
    // Hide "SwitchableComponent"
    function hide() {
      if( showComponent ) {
        // Updating "hiding state" to do something before hiding
        const setHiding: BooleanSetter = switchersRegistry[ switcherID ]
        if( setHiding ) { setHiding( true ) }
        // Hiding "SwitchableComponent" after "wait"
        setTimeout( () => setShowComponent( false ), wait )
      }
      else { throw( 'You can not hide the Switchable Component if this is not on Display' ) }
    }
    // Structuring Component Visibility
    const Component: Component<P> = showComponent
      ? encapsulate<P,CP>( DefaultComponent, callerProps, switcherID )
      : Empty
    return {
        Component: Component,
        call: call,
        hide: hide,
        showing: showComponent,
      }
  }, [ showComponent, callerProps, wait ] )
  return Switchable
}

export default useSwitch