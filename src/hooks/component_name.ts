import Component from '../types/Component'
import ManagerCore from '../classes/ManagerCore'
import { useEffect } from 'react'

interface UseComponentNameParams<P extends object,CP> {
  Component: Component<P,CP>,
  manager: ManagerCore<CP>,
}

// Update the name of the Switchable Component in the manager core to identify it
function useComponentName<P extends object,CP>( params:UseComponentNameParams<P,CP> ) {
  const { Component, manager } = params
  const componentName: string = Component.name
  useEffect( () => {
    manager.componentName = componentName
  }, [ componentName ] )
}

export default useComponentName