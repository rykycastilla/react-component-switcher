import React, { createContext, ReactElement } from 'react'

interface SwitchableContext { hiding:boolean }

const Context = createContext( null as unknown as SwitchableContext )

interface ContextProviderProps {
  children: ReactElement,
  hiding: boolean,
}

const ContextProvider = ( props:ContextProviderProps ): ReactElement => {
  const { children, hiding } = props
  const switchableContext: SwitchableContext = { hiding }
  return (
    <Context.Provider value={ switchableContext }>
      { children }
    </Context.Provider>
  )
}

export default ContextProvider
export { Context }