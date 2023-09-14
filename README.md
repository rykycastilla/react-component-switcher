# react-component-switcher
This is a library to provide **React Hooks** to create switchable **Components** (hiding and showing it)

## API
The API offers two hooks (`useSwitch` and `useHiding`) and four types (`SwitchableComponent`, `Component`, `CallFunction` and `HideFunction`).

### useSwitch
This hook receives a `Component` and return a `SwitchableComponent` object with the structure `{ Component:Component, call:CallFunction, hide:HideFunction, showing:boolean }`

#### `Component: Component`
The property `Component` contain a "switchable" **Rect Component**, it can be handled (showed and hidden) using the other members of `SwitchableComponent`
``` TSX
import React, { CSSProperties, ReactElement, useState } from 'react'
import useSwitch from 'react-component-switcher'

function Component(): ReactElement { ... }

function App(): ReactElement {
  // Using Hook and Component
  const SwitchableComponent = useSwitch( Component )
  return <SwitchableComponent.Component />
}

export default App
```
<sup>[1]</sup>

#### `call: CallFunction`
With this method you can show the switchable component<sup>[2]</sup>. Also it receives an argument to use its value at `callerProps` parameter
``` TSX
// App.tsx
import React, { ReactElement } from 'react'
import useSwitch from 'react-component-switcher'

interface TextCallerProps { text:string }

function Text( props:unknown, callerProps:TextCallerProps ): ReactElement {
  // Destructuring "callerProps"
  const { text } = callerProps
  return <p>{ text }</p>
}

function App(): ReactElement {
  const SwitchableText = useSwitch( Text )
  return (
    <>
      <input type="button" value="Show" onClick={
        () => {
          const callerProps: TextCallerProps = { text: 'Hello World!' }
          // Sending "callerProps" when component is called
          SwitchableText.call( callerProps )
        }
      } />
      { /* Using Switchable Component */ }
      <SwitchableText.Component />
    </>
  )
}

export default App
```
<sup>[3]</sup>

#### `hide: HideFunction`
This method is used to hide the switchable component
``` TSX
// App.tsx
import React, { CSSProperties, ReactElement, useState } from 'react'
import useSwitch, { HideFunction } from 'react-component-switcher'

interface AlertProps { quit:HideFunction }

interface AlertCallerProps {
  text: string,
  textColor: string,
}

function Alert( props:AlertProps, callerProps:AlertCallerProps ): ReactElement {
  const { quit } = props
  const { text, textColor } = callerProps
  return (
    <div style={ styles.alertCard }>
      <p style={ { color: textColor } }>{ text }</p>
      { /* Using hide as quit at onClick event */ }
      <input type="button" value="Accept" style={ styles.alertButton } onClick={ quit } />
    </div>
  )
}

function App(): ReactElement {
  const [ alertText, setAlertText ] = useState( '' )
  // Using Hook
  const SwitchableAlert = useSwitch( Alert )
  return (
    <>
      {
        // Passing "SwitchableAlert.hide" as "quit"
        // "SwitchableAlert" is an state, and states must be passed as props
      }
      <SwitchableAlert.Component quit={ SwitchableAlert.hide } />
      <input type="textfield" placeholder="Write a message here!" style={ styles.input } onChange={
        event => {
          const { value } = event.target
          setAlertText( value )
        }
      } />
      <br />
      <input
        type="button"
        value="Show Alert"
        style={ styles.input }
        onClick={
          () => {
            const callerProps: AlertCallerProps = {
              text: alertText,
              textColor: 'gray',
            }
            SwitchableAlert.call( callerProps )
          }
        } />
    </>
  )
}

// React styles
const styles = {
  alertCard: {
    width: 200,
    height: 200,
    position: 'fixed',
    marginTop: 25,
    marginLeft: 25,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  } as CSSProperties,
  alertButton: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'rgba( 0, 0, 0, 0 )',
    color: 'black',
    fontWeight: '900',
    cursor: 'pointer',
  } as CSSProperties,
  input: {
    marginTop: 25,
    marginLeft: 25,
    border: 'none',
    textAlign: 'center',
  } as CSSProperties,
}

export default App
```
<sup>[4][5]</sup>

#### `showing: boolean`
This property is used to know if the switchable component is visible right now.

### useHiding
`useHiding` is a hook provided to know when the switchable component is created or destroyed. To used it you have to pass the parameter `id:number` of the *component to switch* as an argument of `useHiding`, after that, it will return `false` if the component is showing or `true` if it will hide<sup>[6]</sup>. 
It also would be used to implement animations if you pass a `wait:number` argument (in miliseconds) to `useSwitch`, it will delay the hiding process to include an animation
``` TSX
// App.tsx
import './app.css'
import React, { CSSProperties, ReactElement, useState } from 'react'
import useSwitch, { HideFunction, useHiding } from 'react-component-switcher'

interface AlertProps { quit:HideFunction }

interface AlertCallerProps {
  text: string,
  textColor: string,
}

function Alert( props:AlertProps, callerProps:AlertCallerProps, id:number ): ReactElement {
  const { quit } = props
  const { text, textColor } = callerProps
  // Using Hiding Hook
  const hiding = useHiding( id )
  return (
    <>
      {
        // Using ternary operator to set the class name with the correct animation
        // To understand that, look at "app.css" below it
      }
      <div
        className={ hiding ? 'hiding' : 'showing' }
        style={ styles.alertCard }>
        <p style={ { color: textColor } }>{ text }</p>
        <input type="button" value="Accept" style={ styles.alertButton } onClick={ quit } />
      </div>
    </>
  )
}

function App(): ReactElement {
  const [ alertText, setAlertText ] = useState( '' )
  // Passing "500" miliseconds to "useSwitch", to delay hiding process
  const SwitchableAlert = useSwitch( Alert, 500 )
  return (
    <>
      <SwitchableAlert.Component quit={ SwitchableAlert.hide } />
      <input type="textfield" placeholder="Write a message here!" style={ styles.input } onChange={
        event => {
          const { value } = event.target
          setAlertText( value )
        }
      } />
      <br />
      <input
        type="button"
        value="Show Alert"
        style={ styles.input }
        onClick={
          () => {
            const callerProps: AlertCallerProps = {
              text: alertText,
              textColor: 'gray',
            }
            SwitchableAlert.call( callerProps )
          }
        } />
    </>
  )
}

const styles = {
  alertCard: {
    width: 200,
    height: 200,
    position: 'fixed',
    marginTop: 25,
    marginLeft: 25,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    textAlign: 'center',
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  } as CSSProperties,
  alertButton: {
    outline: 'none',
    border: 'none',
    backgroundColor: 'rgba( 0, 0, 0, 0 )',
    color: 'black',
    fontWeight: '900',
    cursor: 'pointer',
  } as CSSProperties,
  input: {
    marginTop: 25,
    marginLeft: 25,
    border: 'none',
    textAlign: 'center',
  } as CSSProperties,
}

export default App
```
``` CSS
/* app.css */

@keyframes show {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes hide {
  from { opacity: 1 }
  to { opacity: 0 }
}

.showing { animation: show 0.5s }

.hiding {
  opacity: 0;
  animation: hide 0.5s;
}
```

> * This library is also compatible with **ReactNative**
> 1. This code is not be able to work, it is only an example
> 2. The switchable components are default hidden
> 3. If you try to show a visible `SwitchableComponent` it will result `[Error]: You can not call the Switchable Component if this is on Display`
> 3. If you try to hide a hidden `SwitchableComponent` it will result `[Error]: You can not hide the Switchable Component if this is not on Display`
> 5. *React state values* must be passed as props to a switchable component. If you pass it to `callerProps` the value will not update when the state changes
> 6. You can not get the same effect with `SwitchableComponent.showing`, cause it return the current state, but `useHiding` changes its value before the component disappears