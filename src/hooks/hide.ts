import { Context } from '../components/ContextProvider'
import { HideFunction } from '../classes/SwitchableManager'
import { useContext } from 'react'

function useHide(): HideFunction {
  const { hide } = useContext( Context )
  return hide
}

export default useHide