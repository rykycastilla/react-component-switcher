import { Dispatch, SetStateAction } from 'react'

type FunctionVoid = () => void
type FunctionBoolean = () => boolean
type HideFunction = FunctionVoid
// "callerProps" arg required only if it was delcared in the Component
type ShowFunction<CP> = unknown extends CP ? FunctionVoid : ( callerProps:CP ) => void
type BooleanSetter = Dispatch<SetStateAction<boolean>>

interface LoadParams<CP> {
  show: ShowFunction<CP>,
  hide: HideFunction,
  getRendering: FunctionBoolean,
}

class SwitchableManager<CP> {

  private readonly emptyFunction: FunctionVoid = () => { return }
  private readonly loading: Promise<void>
  private resolve: FunctionVoid = this.emptyFunction // Used to resolve the loading promise globally
  private showAction: ShowFunction<CP> = this.emptyFunction
  private hideAction: FunctionVoid = this.emptyFunction
  private getRendering: FunctionBoolean = () => { return false }
  private readonly renderingSetters: BooleanSetter[] = []

  constructor() {
    // Declaring loading promise and making global its resolve function
    this.loading = new Promise( resolve => {
      this.resolve = resolve
    } )
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
    // Get Ready with the manager
    this.resolve()
  }

  public show: ShowFunction<CP> = async( callerProps?:CP ) => {
    await this.loading
    this.showAction( callerProps as CP )
  }

  public hide: HideFunction = async() => {
    await this.loading
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

}

export default SwitchableManager
export { HideFunction, ShowFunction }
export type { SwitchableManager }