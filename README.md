# keydown-from-click

[![npm](https://img.shields.io/npm/v/keydown-from-click.svg)](https://www.npmjs.com/package/keydown-from-click) [![Build Status](https://travis-ci.org/alcar/keydown-from-click.svg?branch=master)](https://travis-ci.org/alcar/keydown-from-click) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/keydown-from-click)

**Generate React keydown handlers by replicating click ones.**

## Disclaimer

This project is no longer being maintained.

## Sections

- [Motivation](#motivation)
- [Installation](#installation)
- [API](#api)
- [Example](#example)
- [Changelog](#changelog)
- [Development](#development)
- [License](#license)

## Motivation

Quoting eslint-plugin-jsx-a11y's [click-events-have-key-events rule](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/click-events-have-key-events.md):

> Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

When creating interactive React elements, **using native interactive HTML elements should always be the first choice**.

In the rare cases in which we need to use a non-interactive HTML element to create an interactive component in React, we should also **"make all functionality available from a keyboard"** ([WCAG 2.1, guideline 2.1](https://www.w3.org/TR/WCAG21/#keyboard-accessible)), i.e., pass it at least one keyboard event handler. Oftentimes, however, the keyboard event handler should just replicate the click handler's actions — similar to how `<button>` elements behave.

This package aims to provide a simple way to do that.

## Installation

```
npm install keydown-from-click
```

## API

_To get a better grasp of each function's behavior, please check their individual test suites._

### `createKeydownFromClick(clickHandler[, options])`

Returns a keydown handler that calls `clickHandler` when either Enter or Space is pressed.

```js
import { createKeydownFromClick } from 'keydown-from-click'

const clickHandler = () => {
  console.log('Boop!')
}

const keydownHandler = createKeydownFromClick(clickHandler)

// ...
```

It's worth noting that, in order to call the click handler, **an artificial click event is created**. Most of its properties come from the original keydown event, but some of them are specific to mouse events and need to be mocked.

While the more straightforward ones, such as `button` and `movementX`, receive their corresponding expected values, the properties that involve coordinates (`clientX`, `pageX`, etc.) demand certain decisions. What this library does is **pretend the user clicked in the center of the element**, and then calculates everything based on that.

There are, however, two properties that are not so predictable: `screenX` and `screenY`. The reason for that is because their values depend on whether a left toolbar is open and how tall is the top bar, respectively. This library considers that **there are no left toolbars open** and **the top bar is 80 pixels high**, which is the default state in Chrome 80.

#### Options

- `keys`

  An array containing the keys (`DOMString`s) that should trigger `clickHandler`.

  Using this option **overrides the default configuration** (`['enter', ' ']`).

  ```js
  const options = {
    keys: ['a', 'b', 'c'],
  }
  ```

- `modifiers`

  An object containing the modifier keys (`altKey`, `ctrlKey`, `metaKey`, `shiftKey`) that should be pressed and held down while pressing Enter — or any of the keys from the `keys` option.

  ```js
  const options = {
    modifiers: {
      altKey: true,
      shiftKey: true,
    },
  }
  ```

  The `modifiers` option **is applied to all keys**, but can be shadowed by inline modifiers (`alt`, `ctrl`, `meta`, `shift`); to do so, just prefix them to your keys along with a plus sign (`+`).

  ```js
  const options = {
    keys: ['shift + a', 'b'],
    modifiers: {
      altKey: true,
      shiftKey: false,
    },
  }

  // Detects (Alt + Shift + 'a') and (Alt + 'b')
  ```

  Also, multiple inline modifiers may be assigned to a single key.

  ```js
  const options = {
    keys: ['alt + shift + a', 'alt + ctrl + b', 'meta + shift + c'],
  }
  ```

- `shouldPropagate`

  A boolean that controls whether the event should propagate; it defaults to `true`.

  ```js
  const options = {
    shouldPropagate: false,
  }

  // Stops event propagation
  ```

### `useKeydownFromClick(clickHandler[, options])`

The hook version of `createKeydownFromClick`.

```js
import { useKeydownFromClick } from 'keydown-from-click'

const clickHandler = () => {
  console.log('Boop!')
}

const Component = () => {
  const keydownHandler = useKeydownFromClick(clickHandler)

  // ...
}
```

#### Options

_All options from `createKeydownFromClick` are also available to `useKeydownFromClick`._

- `extraDependencies`

  An array containing the dependencies that should cause React's `useMemo` to recompute the memoized keydown event handler.

  ```js
  const options = {
    extraDependencies: [someVar, someOtherVar],
  }
  ```

  Using this option **won't** override the default configuration; the values of `extraDependencies` will be added to the end of the dependencies array.

## Example

[CodeSandbox](https://codesandbox.io/s/keydown-from-click-example-rwsxk)

## Changelog

All releases are documented in the project's [changelog](/CHANGELOG.md).

## Development

### Format checking

```
npm run checkFormatting
```

### Linting

```
npm run lint
```

### Type checking

```
npm run checkTyping
```

### Testing

#### Single run

```
npm run test
```

#### Watch mode

```
npm run test --watch
```

### Building

```
npm run build
```

### Releasing (and publishing)

#### Patches

```
npm run release
```

#### Minors

```
npm run release minor
```

#### Majors

```
npm run release major
```

## License

[MIT](/LICENSE)
