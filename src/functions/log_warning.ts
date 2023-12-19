import Errors from '../enums/Errors'
import ManagerCore from '../classes/ManagerCore'

// Launch a valid warning of an specific component (using its manager)
function logWarning<CP>( manager:ManagerCore<CP>, warning:Errors ) {
  const { componentName } = manager
  const message = `${ componentName }: ${ warning }`
  console.warn( message )
}

export default logWarning