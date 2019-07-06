/** @jsx WebComponents */
import React, { useState } from 'react'
import { render } from 'react-dom'
import WebComponents from '../../src'
import './web-component'

export default function SomeComponent () {
  const [ name, setName ] = useState('')

  return (
    <div>
      <p>
        [on custom-event] : {name}
      </p>
      <web-component
        data={{ name }}
        onEventCustomInput={e => {
          setName(e.detail.value)
        }}
      >
      </web-component>
    </div>
  )
}

render(<SomeComponent/>, document.querySelector('#demo'))
