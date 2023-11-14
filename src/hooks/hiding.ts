import { Context } from '../components/ContextProvider'
import { useContext } from 'react'

// Hook: Return "true" when an speciic component (based on "id") is going to be hidden
function useHiding(): boolean {
  const { hiding } = useContext( Context )
  return hiding
}

export default useHiding