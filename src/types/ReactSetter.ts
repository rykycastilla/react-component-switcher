import { Dispatch, SetStateAction } from 'react'

type ReactSetter<T> = Dispatch<SetStateAction<T>>

export default ReactSetter