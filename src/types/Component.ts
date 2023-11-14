import { ReactElement } from 'react'

type Component<P extends object,CP> = ( props:P, callerProps:CP ) => ReactElement

export default Component