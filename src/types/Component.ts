import { ReactElement } from 'react'

type Component<P extends object> = ( props:P ) => ReactElement

export default Component