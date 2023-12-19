import emptyFunction from '../functions/empty_function'
import FunctionVoid from '../types/FunctionVoid'
import ManagerCore from './ManagerCore'

// This class create a Reference to work with the current manager core
class ManagerReference<CP> {

  private MAX_UPDATE_TIME = 2_000
  public update: FunctionVoid
  public updated: Promise<void>
  public value: ManagerCore<CP>
  private updateLateCallbacks: FunctionVoid[] = []

  private updateLateEvent() {
    for( const callback of this.updateLateCallbacks ) { callback() }
  }

  constructor( componentName:string ) {
    this.value = new ManagerCore<CP>( componentName )
    let update: FunctionVoid = emptyFunction
    // This promise should be resolved when this manager reference has assigned a valid manager core
    this.updated = new Promise( ( resolve:FunctionVoid ) => update = resolve )
    this.update = update  // Now the public method "update" can resolve the promise
    // Setting Configuration for "onupdatelate" event
    let updated = false
    this.updated.then( () => updated = true )
    setTimeout( () => {
      if( !updated ) { this.updateLateEvent() }
    }, this.MAX_UPDATE_TIME )
  }

  // Run the event if thet update took too much time
  public onupdatelate( callback:FunctionVoid ) {
    this.updateLateCallbacks.push( callback )
  }

}

export default ManagerReference