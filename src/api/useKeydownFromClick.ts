import React from 'react'

import { FullEventHandler, HookOptions, Options } from '../typings'

import { createKeydownFromClick } from './createKeydownFromClick'

export const useKeydownFromClick = <T extends HTMLElement = HTMLElement>(
  clickHandler: FullEventHandler<T>,
  options: Options & HookOptions = {},
): React.KeyboardEventHandler<T> => {
  const { extraDependencies, keys, modifiers } = options

  const keydownHandler = React.useMemo(
    () => createKeydownFromClick(clickHandler, { keys, modifiers }),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    extraDependencies
      ? [clickHandler, keys, modifiers, ...extraDependencies]
      : [clickHandler, keys, modifiers],
  )

  return React.useCallback(event => keydownHandler(event), [keydownHandler])
}
