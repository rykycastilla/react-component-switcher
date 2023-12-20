import ManagerCore from '../classes/ManagerCore'
import SwitchableComponent from '../types/SwitchableComponent'
import SwitchableManager from '../classes/SwitchableManager'
import { useEffect, useState } from 'react'

function useRendering<P extends object,CP>( manager:SwitchableComponent<P,CP> ): boolean {
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