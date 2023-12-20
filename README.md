# react-component-switcher 2.0
This is a library to create Switchable Components

> **WARNING:** This version of the library has API changes, do not use it for existing projects without refactoring

## Install
You must install it using `npm`
``` bash
npm install react-component-switcher
```

## API
The API offers three hooks (`useHide`, `useHiding` and `useRendering`), three types (`SwitchableComponent`, `CallFunction` and `HideFunction`) and one factory function (`CreateSwitchable`).

### `CreateSwitchable`
This is a factory function to make a single **React Component** switchable. It receives a Component and return its `SwitchableComponent`.

``` TSX
// Component.tsx
import CreateSwitchable from 'react-component-switcher'
import React, { ReactElement } from 'react'

const Component = (): ReactElement => {
  return <></>
}

export default CreateSwitchable( Component )
```
<sup>[1][2]</sup>

### `SwitchableComponent`
This is a React Component with some methods to handle its visibility imperatively. You have to call it as a single component to use it in the React Tree<sup>[3]</sup>.

``` TSX
// App.tsx
import Component from './Component'
import React, { ReactElement } from 'react'

const App = (): ReactElement => {
  // Calling the component in the React Tree to use it
  return <Component />
}

export default App
```
<sup>[4]</sup>

#### `show: ShowFunction<CP>`<sup>[5]</sup>
This method is used to *call* the switchable component

``` TSX
// Component.tsx
import CreateSwitchable from 'react-component-switcher'
import React, { ReactElement } from 'react'

const Component = (): ReactElement => {
  return <h2>Switchable text</h2>
}

export default CreateSwitchable( Component )
```

``` TSX
// App.tsx
import Component from './Component'
import React, { ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <>
      { /* This button can show the switchable component */ }
      <input type="button" value="Show" onClick={ () => Component.show() } />
      <Component />
    </>
  )
}

export default App
```

If you want to pass a custom value in every *show* call to work with it inside the switchable component: you can use `callerProps`<sup>[6]</sup>

``` TSX
// Component.tsx
import CreateSwitchable from 'react-component-switcher'
import React, { ReactElement } from 'react'

interface ComponentCallerProps { message:string }

const Component = ( props:object, callerProps:ComponentCallerProps ): ReactElement => {
  // Using callerProps
  const { message } = callerProps
  return <h2>{ message }</h2>
}

export default CreateSwitchable( Component )
```

``` TSX
// App.tsx
import Component from './Component'
import React, { ReactElement } from 'react'

const App = (): ReactElement => {
  return (
    <>
      <input type="textfield" id="input" />
      <input
        type="button"
        value="Show"
        onClick={
          () => {
            // Getting the current value of the input element
            const $input = document.getElementById( 'input' ) as HTMLInputElement
            const message: string = $input.value
            // Using the current value with the component
            Component.show( { message } )
          }
        } />
      <Component />
    </>
  )
}

export default App
```
<sup>[7]</sup>

#### `hide: HideFunction`
**hide** method is used to hide the switchable component and quit it of the page flow (destroying it temporarily)

``` TSX
// Component.tsx
import CreateSwitchable from 'react-component-switcher'
import React, { ReactElement } from 'react'

const Component = (): ReactElement => {
  return <h2>Switchable text</h2>
}

export default CreateSwitchable( Component )
```

``` TSX
// App.tsx
import Component from './Component'
import React, { ReactElement } from 'react'

// Show/Hide buttons
const ControlButtons = (): ReactElement => {
  return (
    <>
      <input type="button" value="Show'" onClick={ Component.show } />

      { /* Hide function here (at "onClick") */ }
      <input type="button" value="Hide'" onClick={ Component.hide } />
    </>
  )
}

const App = (): ReactElement => {
  return (
    <>
      <ControlButtons />
      <Component />
    </>
  )
}

export default App
```

### useHide<sup>[8]</sup>
The hook returns a `HideFunction`, providing to the switchable component the capability to hide itself.

### useHiding <sup>[8]</sup>
`useHiding` is a hook provided to know when the switchable component is being destroyed. It will return `false` if the component is showing or `true` if it will hide. 
It also would be used to implement animations if you pass a `hidingDelay:number` argument (in miliseconds) to `CreateSwitchable`, it will delay the hiding process to include an animation

``` TSX
// Component.tsx
import CreateSwitchable, { useHiding } from 'react-component-switcher'
import React, { ReactElement } from 'react'
import './component.css'

const Component = (): ReactElement => {
  // Using Hiding hook
  const hiding: boolean = useHiding()
  const state: string = hiding ? 'hiding' : 'showing'
  return <h2 className={ state }>Fadeable Text</h2>
}

export default CreateSwitchable( Component, 500 )  // Using hiding delay
```

``` CSS
/* component.css */

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

``` TSX
// App.tsx
import Component from './Component'
import React, { ReactElement } from 'react'

const ControlButtons = (): ReactElement => {
  return (
    <>
      <input type="button" value="Show'" onClick={ Component.show } />
      <input type="button" value="Hide'" onClick={ Component.hide } />
    </>
  )
}

const App = (): ReactElement => {
  return (
    <>
      <ControlButtons />
      <Component />
    </>
  )
}

export default App
```

### useRendering
`useRendering` receives a `SwitchableComponent` and return `true` if it is on display right now. Cause it is a React Hook, when the rendering state changes the boolean value will change too<sup>[9]</sup>.

> * This library is also compatible with **ReactNative**
> 1. This code is not be able to work, it is only an example
> 2. To full fast refresh support you should build the new Switchable Component in the same file it was declared (like the above example). Also, it is recommended to declare and build your Switchable Components in a different file than the rest of the code
> 3. All Switchable Components are hidden by default
> 4. You can also declare and use `props` like a single component
> 5. Generic type `CP` represents the `callerProps` type of the `ShowFunction`
> 6. If the component was not declared with `callerProps`, the `ShowFunction` argument must not be provided
> 7. `callerProps` can have any data type
> 8. This Hook cannot be executed out of a SwitchableComponent Context
> 9. You can not get the same effect with `useHiding`, cause it changes its value before the component disappears, but `useRendering` returns the current state