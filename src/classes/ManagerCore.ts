import emptyFunction from '../functions/empty_function'
import Errors from '../enums/Errors'
import logWarning from '../functions/log_warning'
import ReactSetter from '../types/ReactSetter'
import { UseManagerParams } from '../hooks/manager'
import { VisibilitySetter } from '../hooks/visibility'

/* ManagerCore is the intermediary between the SwitchableManager (public interface) and the
SwitchableComponent Context, handling its state imperatively (with its methods) */

interface UseParams<CP> extends UseManagerParams<CP> { id:string }

class ManagerCore<CP> {

  private componentId = ''  // Used to avoid multiple switchable components of the same type
  private setCallerProps: ReactSetter<CP> = emptyFunction
  private setVisibility: VisibilitySetter = emptyFunction
  private readonly renderingSetters: ReactSetter<boolean>[] = []
  public rendering = false

  constructor(
    public componentName: string
  ) {}

  // "show" action internal function
  public async show( callerProps?:CP ) {
    if( this.rendering ) { logWarning( this, Errors.ON_DISPLAY ) }
    else {
      this.setCallerProps( callerProps as CP )  // Invoking with caller props
      this.setVisibility( true )
    }
  }

  // "hide" action internal function
  public async hide() {
    if( !this.rendering ) { logWarning( this, Errors.NOT_ON_DISPLAY ) }
    else { this.setVisibility( false ) }
  }

  // Assign a React Component (using its state) to the manager
  public use( params:UseParams<CP> ) {
    const { id, setCallerProps, setVisibility } = params
    this.setCallerProps = setCallerProps
    this.setVisibility = setVisibility
    this.checkComponentId( id )  // Avoiding multiple Switchable Components of the same type
  }

  // Force React rendering (to update the rendering state)
  private updateRenderingState( newState:boolean ) {
    const { renderingSetters } = this
    for( const setRendering of renderingSetters ) {
      setRendering( newState )
    }
  }
  
  // Set a new "rendering" state
  public updateRendering( rendering:boolean ) {
    this.rendering = rendering
    this.updateRenderingState( rendering )
  }

  // Suscribe an specific rendering setter to an specific SwitchableManager instance to use it when rendering state changes
  public suscribeRenderSetter( setter:ReactSetter<boolean> ) {
    this.renderingSetters.push( setter )
  }

  // Unsuscribe the rendering setter
  public unsuscribeRenderSetter( setter:ReactSetter<boolean> ) {
    // Getting index
    const index: number = this.renderingSetters.indexOf( setter )
    // Erasing based on index
    this.renderingSetters.splice( index, 1 )
  }

  // If you try to assign a different "id" than the first time it will return an error
  // cause you are trying to use too many components of the same type
  private checkComponentId( id:string ) {
    const componentId: string = this.componentId,
      differentId: boolean = id !== componentId
    if( componentId && differentId ) { logWarning( this, Errors.TOO_MANY_COMPONENTS ) }
    this.componentId = id
  }

}

export default ManagerCore