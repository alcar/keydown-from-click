import React from 'react'

import { KeydownHandlerCreator } from '../typings'
import { combineKeysWithModifiers, shouldTriggerHandler } from '../utils/event'

export const createKeydownFromClick: KeydownHandlerCreator = (
  clickHandler,
  options = {},
) => {
  const { keys: optionsKeys, modifiers: globalModifiers = {} } = options

  const keys = optionsKeys
    ? optionsKeys.map(key => key.toLowerCase())
    : ['enter']

  const keyModifierCombos = combineKeysWithModifiers(keys, globalModifiers)

  const keydownHandler = (event: React.KeyboardEvent): void => {
    if (shouldTriggerHandler(keyModifierCombos, event)) {
    clickHandler({
      altKey: event.altKey,
      ctrlKey: event.ctrlKey,
      currentTarget: event.currentTarget,
      metaKey: event.metaKey,
      shiftKey: event.shiftKey,
      target: event.target,
    })
  }
}

  return keydownHandler
}
