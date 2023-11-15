import { Context } from '../components/ContextProvider'
import Errors from '../enums/Errors'
import { HideFunction } from '../classes/SwitchableManager'
import { useContext } from 'react'

function useHide(): HideFunction {
  const switchableContext = useContext( Context )
  if( !switchableContext ) { throw( Errors.HIDE_OUT_OF_CONTEXT ) }
  const { hide } = switchableContext
  return hide
}

export default useHide