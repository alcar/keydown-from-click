# keydown-from-click

[![npm](https://img.shields.io/npm/v/keydown-from-click.svg)](https://www.npmjs.com/package/keydown-from-click) [![Build Status](https://travis-ci.org/alcar/keydown-from-click.svg?branch=master)](https://travis-ci.org/alcar/keydown-from-click) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/keydown-from-click)

**Generate keydown handlers by replicating click ones.**

## Sections

- [Motivation](#motivation)
- [Installation](#installation)
- [API](#api)
- [Example](#example)
- [Changelog](#changelog)
- [Development](#development)
- [License](#license)

## Motivation

The [click-events-have-key-events rule](https://github.com/evcohen/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/click-events-have-key-events.md) from ESLint's [JSX a11y plugin](https://github.com/evcohen/eslint-plugin-jsx-a11y) enforces that click handlers are accompanied by at least one keyboard handler.

> Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

However, oftentimes the keyboard handler should just replicate the click handler's behavior; this package aims to provide a simple way to do that.

## Installation

```
npm install keydown-from-click
```

## API

_To get a better grasp of each function's behavior, please check their individual test suites._

### `createKeydownFromClick(clickHandler[, options])`

Returns a keydown handler that calls `clickHandler` when the Enter key is pressed.

```js
import { createKeydownFromClick } from 'keydown-from-click'

const clickHandler = () => {
  console.log('Boop!')
}

const keydownHandler = createKeydownFromClick(clickHandler)

// ...
```

#### Options

- `keys`

  An array containing the keys (`DOMString`s) that should trigger `clickHandler`.

  Using this option overrides the default configuration (`['Enter']`).

  ```js
  const options = {
    keys: ['a', 'b', 'c'],
  }
  ```

- `modifiers`

  An object containing the modifier keys (`altKey`, `ctrlKey`, `metaKey`, `shiftKey`) that should be pressed and held down while pressing Enter – or any of the keys from the `keys` option.

  ```js
  const options = {
    modifiers: {
      altKey: true,
      shiftKey: true,
    },
  }
  ```

  The `modifiers` option is applied to all keys, but can be shadowed by inline modifiers (`alt`, `ctrl`, `meta`, `shift`); to do so, just prefix them to your keys along with a plus sign (`+`).

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

### `useKeydownFromClick(clickHandler[, options])`

The hook version of `createKeydownFromClick`.

```js
import { useKeydownFromClick } from 'keydown-from-click'
import React from 'react'

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

  An array containing the dependencies that should cause React's `useMemo` to recompute the memoized keydown handler.

  Using this option **won't** override the default configuration; the values of `extraDependencies` will be added to the end of the dependencies array.

  ```js
  const options = {
    extraDependencies: [someVar, someOtherVar],
  }
  ```

## Example

[CodeSandbox](https://codesandbox.io/s/keydown-from-click-example-rwsxk)

## Changelog

All releases are documented in the project's [changelog](/CHANGELOG.md).

## Development

### Building

```
npm run build
```

### Formatting

```
npm run format
```

### Linting

```
npm run lint
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

### Testing

#### Single run

```
npm run test
```

#### Watch mode

```
npm run test --watch
```

### Type checking

```
npm run checkTypes
```

## License

[MIT](/LICENSE)
