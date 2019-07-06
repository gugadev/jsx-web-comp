# @gugadev/jsx-web-comp

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

This module adds a custom JSX pragma enabling native DOM events to be handled declaratively in JSX. In traditional JSX, events need to be handled by passing down props to elements such as `onClick` or `onChange` that will be attached to the compiled DOM element at some point during the application's lifecycle. For standard events, this works great; however, for events that aren't as common or for [constructed events](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events) or instances of [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent), the prop API falls short.

This JSX pragma allows users to declaratively attach event listeners to elements using the `onEvent<EventName>` syntax where `<EventName>` would be replaced by a [camelCase](https://en.wikipedia.org/wiki/Camel_case) version of the event's name. So, a `'click'` event would use the prop `onEventClick` or a custom event with a name of `accordion-toggle` would use the `onEventAccordionToggle` prop.

Also, now you can pass complex properties to your web components directly into the component as any regular React component. The pragma will check for this types of properties and apply a `JSON.stringify`.

**Note**: to avoid get errors the first time the web component is rendered, use a custom converter for Array/Object properties. For example, in LitElement:

```typescript
const converter = {
    fromAttribute(value) {
        try {
            return JSON.parse(value)
        } catch (o_O) {
            return {}
        }
    },
    toAttribute(value) {
        return JSON.stringify(value)
    }
}

...

@property({ type: Object, converter }) data: Record<string, any> = {}
```

## Why onEvent?

The use of `onEvent<EventName>`, though a bit verbose, was intentional to minimize conflicts with existing code in the React ecosystem while still keeping the syntax familiar. Using `on<EventName>` would require double checking for the native JSX events. Likewise, using syntax such as `on-accordion-toggle` would feel foreign to existing JSX codebases. The `onEvent` prefix seemed like the best option in the short term.

## Installing

The recommended installation method of this package is through [npm](http://npmjs.com). If you are unfamiliar with the npm ecosystem, there is some great [documentation available on the npm website](https://docs.npmjs.com/cli/install).

If you are familiar with npm, you can install this package using the command

`npm i -D @gugadev/jsx-web-comp`

## Usage

Because the primary output of this package is a JSX pragma, you will first need to include the `/** @jsx <PRAGMA_NAME> */` syntax in your file.

```jsx
/** @jsx WebComponents */
import React, { useState } from 'react'
import WebComponents from '@gugadev/jsx-web-comp'

export default function SomeComponent (props) {
    const [ name, setName ] = useState('')
    
    return <div>
        <p>My name is {name}</p>

        <web-component
            data={{ name }}
            onEventCustomInput={e => setName(e.detail.value)}
        >
        </web-component>
    </div>
}
```

In the above example, `<web-component>` is an example of a [custom element](https://css-tricks.com/an-introduction-to-web-components/) that dispatches an event called `custom-input`. In our React application, we want to listen for that custom event and set the name every time the event is emitted.

Using the `/** @jsx WebComponents */` pragma at the top of the file lets JSX know that we want to use the function imported in line 3 (`import WebComponents from '@gugadev/jsx-web-comp'`) as an addition to React's built-in JSX engine.

The new props will only work for implementations of [`EventTarget`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget), so the new props are not ignored on React components, but should work on all DOM elements represented by React's JSX.

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
