type FunctionVoid = () => void
type FunctionBoolean = () => boolean
type HideFunction = FunctionVoid
// "callerProps" arg required only if it was delcared in the Component
type ShowFunction<CP> = unknown extends CP ? FunctionVoid : ( callerProps:CP ) => void

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

  constructor() {
    // Declaring loading promise and making global its resolve function
    this.loading = new Promise( resolve => {
      this.resolve = resolve
    } )
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

  get rendering(): boolean {
    return this.getRendering()
  }

  // Prepare an instance of itself to declare valid methods
  static use<CP>( instance:SwitchableManager<CP>, params:LoadParams<CP> ) {
    const { show, hide, getRendering } = params
    instance.declare( show, hide, getRendering )
  }

}

export default SwitchableManager
export { HideFunction, ShowFunction }