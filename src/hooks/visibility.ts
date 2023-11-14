import { useMemo, useState } from 'react'

type VisibilitySetter = ( newState:boolean ) => void

interface VisbilityProperties {
  hiding: boolean,
  rendering: boolean,
  setVisibility: VisibilitySetter,
}

// Offers tool to see and manage the visbility state of the switchable component
function useVisibility( hidingDelay:number ): VisbilityProperties {
  const [ hiding, setHiding ] = useState( true )
  const [ rendering, setRendering ] = useState( false )
  const setVisibility: VisibilitySetter = useMemo( () => {
    return  ( show:boolean ) => {
      setHiding( !show )
      // Setting a custom delay to support disappearing animations
      const waitFor: number = show ? 0 : hidingDelay
      setTimeout( () => setRendering( show ), waitFor )
    }
  }, [ hidingDelay ] )
  return { hiding, rendering, setVisibility }
}

export default useVisibility
export { VisibilitySetter }