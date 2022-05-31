import {
  KeyboardEventHandler,
  MouseEventHandler,
  useCallback,
  useMemo,
} from 'react'

import { HookOptions, Options } from '../typings'

import { createKeydownFromClick } from './createKeydownFromClick'

export const useKeydownFromClick = <TElement extends HTMLElement = HTMLElement>(
  clickHandler: MouseEventHandler<TElement>,
  options: Options & HookOptions = {},
): KeyboardEventHandler<TElement> => {
  const { extraDependencies, keys, modifiers, shouldPropagate } = options

  const keydownHandler = useMemo(
    () =>
      createKeydownFromClick<TElement>(clickHandler, {
        keys,
        modifiers,
        shouldPropagate,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    extraDependencies
      ? [clickHandler, keys, modifiers, shouldPropagate, ...extraDependencies]
      : [clickHandler, keys, modifiers, shouldPropagate],
  )

  return useCallback(event => keydownHandler(event), [keydownHandler])
}
