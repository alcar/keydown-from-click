import React from 'react'

import { createKeydownFromClick } from '../createKeydownFromClick'
import { KeydownHandlerCreatorHook } from '../typings'

export const useKeydownFromClick: KeydownHandlerCreatorHook = (
  clickHandler,
  options = {},
) => {
  const { extraDependencies, keys, modifiers } = options

  const keydownHandler = React.useMemo(
    () => createKeydownFromClick(clickHandler, { keys, modifiers }),
    //eslint-disable-next-line react-hooks/exhaustive-deps
    extraDependencies
      ? [clickHandler, keys, modifiers, ...extraDependencies]
      : [clickHandler, keys, modifiers],
  )

  return React.useCallback(
    (event: React.KeyboardEvent) => keydownHandler(event),
    [keydownHandler],
  )
}
