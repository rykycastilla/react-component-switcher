import switchersRegistry from '../objects/switchers_registry'
import { useState } from 'react'

// Hook: Return "true" when an speciic component (based on "id") is going to be hidden
function useHiding( id:number ): boolean {
  const [ hiding, setHiding ] = useState( false )
  // Saving state setter at "switchersRegitry" to update from another place
  switchersRegistry[ id ] = setHiding
  return hiding
}

export default useHiding