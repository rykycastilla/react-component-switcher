import ManagerReference from '../classes/ManagerReference'
import ManagerCore from '../classes/ManagerCore'
import ReactSetter from '../types/ReactSetter'
import { useEffect, useId, useMemo } from 'react'
import { VisibilitySetter } from '../hooks/visibility'

interface ManagerIndex<CP> {
  [ id: string ]: ManagerCore<CP>
}

const index: ManagerIndex<unknown> = {}

/*
 1. useManager have the purpose to find the original value of the manager core (base on id):
It is necesary to use only one manager core reference through every fast refresh cycle (edit);
when you edit the switchable component source code, is generated another manager core, this hook avoid that
 2. Assign state setters to the manager core to handle it imperatively
 3. Check if there are more than one SwitchableComponent of the same type in the React Tree
*/

interface UseManagerParams<CP> {
  setVisibility: VisibilitySetter,
  setCallerProps: ReactSetter<CP>,
}

function useManager<CP>( managerReference:ManagerReference<CP>, params:UseManagerParams<CP> ): ManagerCore<CP> {
  const managers = index as ManagerIndex<CP>
  const id: string = useId()
  // Suscribing manager
  const manager: ManagerCore<CP> = useMemo( () => {
    if( !managers[ id ] ) { managers[ id ] = managerReference.value }
    managerReference.value = managers[ id ]  // Recovering the original value 
    return managerReference.value
  }, [] )
  // Setting manager configuration (to handle state)
  useEffect( () => {
    manager.use( { id, ...params } )
    managerReference.update()  // Ready to execute methods
  }, [] )
  return manager
}

export default useManager
export { UseManagerParams }