import Errors from '../enums/Errors'
import FunctionVoid from '../types/FunctionVoid'
import logWarning from '../functions/log_warning'
import ManagerCore from './ManagerCore'
import ManagerReference from './ManagerReference'

/* SwitchableManager represents a public interface to handle the state (imperatively) of the
SwitchableComponent. It uses a ManagerReference to access the current ManagerCore and handle its basic methods
*/

type HideFunction = FunctionVoid
// "callerProps" arg required only if it was delcared in the Component
type ShowFunction<CP> = unknown extends CP ? FunctionVoid : ( callerProps:CP ) => void

class SwitchableManager<CP> {

  public readonly coreReference: ManagerReference<CP>

  // Access the core of the current manager
  private getCore = (): ManagerCore<CP> => {
    return this.coreReference.value
  }

  constructor( reference:ManagerReference<CP> ) {
    reference.onupdatelate( () => { 
      const core = this.getCore()
      logWarning( core, Errors.NOT_ON_TREE )
    } )
    this.coreReference = reference
  }

  // Show the SwitchableComponent when it is mounted
  public show: ShowFunction<CP> = async( callerProps?:CP ) => {
    await this.coreReference.updated
    const core = this.getCore()
    core.show( callerProps as CP )
  }

  // Hide the SwitchableComponent when it is mounted
  public hide: HideFunction = async() => {
    await this.coreReference.updated
    const core = this.getCore()
    core.hide()
  }

  // Return the core of the current manager
  static extractCore<CP>( instance:SwitchableManager<CP> ): ManagerCore<CP> {
    const core = instance.getCore()
    return core
  }

}

export default SwitchableManager
export { HideFunction, ShowFunction }