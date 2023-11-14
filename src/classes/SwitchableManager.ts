type FunctionVoid = () => void
type FunctionBoolean = () => boolean
type HideFunction = FunctionVoid
type ShowFunction = FunctionVoid

interface LoadParams {
  show: FunctionVoid,
  hide: FunctionVoid,
  getRendering: FunctionBoolean,
}

class SwitchableManager {

  private readonly emptyFunction: FunctionVoid = () => { return }
  private readonly loading: Promise<void>
  private resolve: FunctionVoid = this.emptyFunction // Used to resolve the loading promise globally
  private showAction: FunctionVoid = this.emptyFunction
  private hideAction: FunctionVoid = this.emptyFunction
  private getRendering: FunctionBoolean = () => { return false }

  constructor() {
    // Declaring loading promise and making global its resolve function
    this.loading = new Promise( resolve => {
      this.resolve = resolve
    } )
  }

  // Declaring valid methods to manage the switchable component
  private declare( show:FunctionVoid, hide:FunctionVoid, getRendering:FunctionBoolean ) {
    this.showAction = show
    this.hideAction = hide
    this.getRendering = getRendering
    // Get Ready with the manager
    this.resolve()
  }

  public show: ShowFunction = async() => {
    await this.loading
    this.showAction()
  }

  public hide: HideFunction = async() => {
    await this.loading
    this.hideAction()
  }

  get rendering(): boolean {
    return this.getRendering()
  }

  // Prepare an instance of itself to declare valid methods
  static use( instance:SwitchableManager, params:LoadParams ) {
    const { show, hide, getRendering } = params
    instance.declare( show, hide, getRendering )
  }

}

export default SwitchableManager
export { HideFunction, ShowFunction }