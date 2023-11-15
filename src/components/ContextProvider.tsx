import { HideFunction } from '../classes/SwitchableManager'
import React, { createContext, ReactElement } from 'react'

interface SwitchableContext {
  hiding: boolean,
  hide: HideFunction,
}

const Context = createContext( null as unknown as SwitchableContext )

interface ContextProviderProps {
  children: ReactElement,
  hiding: boolean,
  hide: HideFunction,
}

const ContextProvider = ( props:ContextProviderProps ): ReactElement => {
  const { children, hiding, hide } = props
  const switchableContext: SwitchableContext = { hiding, hide }
  return (
    <Context.Provider value={ switchableContext }>
      { children }
    </Context.Provider>
  )
}

export default ContextProvider
export { Context }