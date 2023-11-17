import { Dispatch, SetStateAction } from 'react'
import Errors from '../enums/Errors'

type FunctionVoid = () => void
type FunctionBoolean = () => boolean
type HideFunction = () => void
// "callerProps" arg required only if it was delcared in the Component
type ShowFunction<CP> = unknown extends CP ? FunctionVoid : ( callerProps:CP ) => void
type BooleanSetter = Dispatch<SetStateAction<boolean>>

interface LoadParams<CP> {
  show: ShowFunction<CP>,
  hide: HideFunction,
  getRendering: FunctionBoolean,
}

class SwitchableManager<CP> {

  private componentOnTree = false
  private readonly mountParent: FunctionVoid
  private readonly parentMounted: Promise<void>
  private readonly emptyFunction: FunctionVoid = () => { return }
  private showAction: ShowFunction<CP> = this.emptyFunction
  private hideAction: FunctionVoid = this.emptyFunction
  private getRendering: FunctionBoolean = () => { return false }
  private readonly renderingSetters: BooleanSetter[] = []

  constructor() {
    let mountParent: FunctionVoid = this.emptyFunction
    // mountParent only should be executed when the component containing the Switchable declaration is mounted
    this.parentMounted = new Promise( resolve => mountParent = resolve )
    this.mountParent = mountParent
  }

  private updateRenderingState = ( newState:boolean ) => {
    const { renderingSetters } = this
    for( const setRendering of renderingSetters ) {
      setRendering( newState )
    }
  }
  
  // Declaring valid methods to manage the switchable component
  private declare( show:ShowFunction<CP>, hide:HideFunction, getRendering:FunctionBoolean ) {
    this.showAction = show
    this.hideAction = hide
    this.getRendering = getRendering
  }

  public show: ShowFunction<CP> = async( callerProps?:CP ) => {
    await this.parentMounted
    if( !this.componentOnTree ) { throw( Errors.NOT_ON_TREE ) }
    this.showAction( callerProps as CP )
  }

  public hide: HideFunction = async() => {
    await this.parentMounted
    if( !this.componentOnTree ) { throw( Errors.NOT_ON_TREE ) }
    this.hideAction()
  }

  // Prepare an instance of itself to declare valid methods
  static use<CP>( instance:SwitchableManager<CP>, params:LoadParams<CP> ) {
    const { show, hide, getRendering } = params
    // Getting rendering states
    const previousRenderingState: boolean = instance.getRendering(),
      currentRenderingState: boolean = getRendering()
    // Updating Methods
    instance.declare( show, hide, getRendering )
    // Updating rendering state
    if( previousRenderingState !== currentRenderingState ) {
      instance.updateRenderingState( currentRenderingState )
    }
  }

  // Assign a Component to the manager. If a "match" already exists it will return an Error
  static setComponentOnTree<CP>( instance:SwitchableManager<CP> ) {
    if( instance.componentOnTree ) {
      throw( Errors.TOO_MANY_COMPONENTS )
    }
    instance.componentOnTree = true
  }

  // Get the current value of rendering (no state)
  static getRendering<CP>( instance:SwitchableManager<CP> ): boolean {
    const rendering: boolean = instance.getRendering()
    return rendering
  }

  // Suscribe an specific rendering setter to an specific SwitchableManager instance to use it when rendering state changes
  static suscribeRenderSetter<CP>( instance:SwitchableManager<CP>, setter:BooleanSetter ) {
    instance.renderingSetters.push( setter )
  }

  // Unsuscribe the rendering setter
  static unsuscribeRenderSetter<CP>( instance:SwitchableManager<CP>, setter:BooleanSetter ) {
    // Getting index
    const index: number = instance.renderingSetters.indexOf( setter )
    // Erasing based on index
    instance.renderingSetters.splice( index, 1 )
  }

  // Indicates that the parent component was mounted
  // Prepare the manager to execute public methods cause all children has been mounted (probably incluiding the switchabe component)
  static mountParent<CP>( instance:SwitchableManager<CP> ) {
    instance.mountParent()
  }

}

export default SwitchableManager
export { HideFunction, ShowFunction }
export type { SwitchableManager }