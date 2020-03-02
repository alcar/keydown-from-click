import React from 'react'

import { FullEventHandler, Options } from '../typings'
import { combineKeysWithModifiers, shouldTriggerHandler } from '../utils/event'

export const createKeydownFromClick = <T extends HTMLElement = HTMLElement>(
  clickHandler: FullEventHandler<T>,
  options: Options = {},
): React.KeyboardEventHandler<T> => {
  const { keys: optionsKeys, modifiers: globalModifiers = {} } = options

  const keys = optionsKeys
    ? optionsKeys.map(key => key.toLowerCase())
    : ['enter']

  const keyModifierCombos = combineKeysWithModifiers(keys, globalModifiers)

  return (event: React.KeyboardEvent<T>): void => {
    if (shouldTriggerHandler(keyModifierCombos, event)) {
      clickHandler({
        altKey: event.altKey,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        ctrlKey: event.ctrlKey,
        currentTarget: event.currentTarget,
        defaultPrevented: event.defaultPrevented,
        eventPhase: event.eventPhase,
        isDefaultPrevented: event.isDefaultPrevented,
        isPropagationStopped: event.isPropagationStopped,
        isTrusted: event.isTrusted,
        metaKey: event.metaKey,
        nativeEvent: event.nativeEvent,
        persist: event.persist,
        preventDefault: event.preventDefault,
        shiftKey: event.shiftKey,
        stopPropagation: event.stopPropagation,
        target: event.target,
        timeStamp: event.timeStamp,
        type: event.type,
      })
    }
  }
}
