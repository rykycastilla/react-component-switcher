import SwitchableManager from '../classes/SwitchableManager'
import { useEffect, useState } from 'react'

function useRendering<CP>( manager:SwitchableManager<CP> ): boolean {
  // Setting default value
  const getDefaultRendering = (): boolean => SwitchableManager.getRendering( manager )
  const [ rendering, setRendering ] = useState( getDefaultRendering )
  // Suscribing to change when it is needed
  useEffect( () => {
    SwitchableManager.suscribeRenderSetter( manager, setRendering )
    return () => {
      SwitchableManager.unsuscribeRenderSetter( manager, setRendering )
    }
  }, [] )
  manager
  return rendering
}

export default useRendering