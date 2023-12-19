import ManagerCore from '../classes/ManagerCore'
import SwitchableManager from '../classes/SwitchableManager'
import { useEffect, useState } from 'react'

function useRendering<CP>( manager:SwitchableManager<CP> ): boolean {
  // Setting default value
  const managerCore: ManagerCore<CP> = SwitchableManager.extractCore( manager ),
    defaultRendering: boolean = managerCore.rendering
  const [ rendering, setRendering ] = useState( defaultRendering )
  // Suscribing to change when it is needed
  useEffect( () => {
    managerCore.suscribeRenderSetter( setRendering )
    return () => {
      managerCore.unsuscribeRenderSetter( setRendering )
    }
  }, [] )
  return rendering
}

export default useRendering