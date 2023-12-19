import ManagerCore from '../classes/ManagerCore'
import { useEffect } from 'react'

function useUpdateRendering<CP>( manager:ManagerCore<CP>, rendering:boolean ) {
  useEffect( () => {
    manager.updateRendering( rendering )
  }, [ rendering ] )
}

export default useUpdateRendering