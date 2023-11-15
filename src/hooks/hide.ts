import { Context } from '../components/ContextProvider'
import Errors from '../enums/Errors'
import { HideFunction } from '../classes/SwitchableManager'
import { useContext } from 'react'

// Return a "HideFunction" to hide the switchable component (imperatively) inside it
function useHide(): HideFunction {
  const switchableContext = useContext( Context )
  if( !switchableContext ) { throw( Errors.HIDE_OUT_OF_CONTEXT ) }
  const { hide } = switchableContext
  return hide
}

export default useHide