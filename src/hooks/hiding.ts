import { Context } from '../components/ContextProvider'
import Errors from '../enums/Errors'
import { useContext } from 'react'

// Hook: Return "true" when an speciic component (based on "id") is going to be hidden
function useHiding(): boolean {
  const switchableContext = useContext( Context )
  if( !switchableContext ) { throw( Errors.HIDING_OUT_OF_CONTEXT ) }
  const { hiding } = switchableContext
  return hiding
}

export default useHiding