import React from 'react'

import { HookOptions, Options } from '../typings'

import { createKeydownFromClick } from './createKeydownFromClick'

export const useKeydownFromClick = <T extends HTMLElement = HTMLElement>(
  clickHandler: React.MouseEventHandler<T>,
  options: Options & HookOptions = {},
): React.KeyboardEventHandler<T> => {
  const { extraDependencies, keys, modifiers, shouldPropagate } = options

  const keydownHandler = React.useMemo(
    () =>
      createKeydownFromClick<T>(clickHandler, {
        keys,
        modifiers,
        shouldPropagate,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    extraDependencies
      ? [clickHandler, keys, modifiers, shouldPropagate, ...extraDependencies]
      : [clickHandler, keys, modifiers, shouldPropagate],
  )

  return React.useCallback(event => keydownHandler(event), [keydownHandler])
}
