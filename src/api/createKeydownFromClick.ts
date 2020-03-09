import React from 'react'

import { Options } from '../typings'
import { combineKeysWithModifiers, shouldTriggerHandler } from '../utils/event'

export const createKeydownFromClick = <T extends HTMLElement = HTMLElement>(
  clickHandler: React.MouseEventHandler<T>,
  options: Options = {},
): React.KeyboardEventHandler<T> => {
  const {
    keys: optionsKeys,
    modifiers: globalModifiers = {},
    shouldPropagate = true,
  } = options

  const keys = optionsKeys
    ? optionsKeys.map(key => key.toLowerCase())
    : ['enter']

  const keyModifierCombos = combineKeysWithModifiers(keys, globalModifiers)

  return (event: React.KeyboardEvent<T>): void => {
    if (shouldTriggerHandler(keyModifierCombos, event)) {
      clickHandler({
        // Available properties and methods
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
        persist: event.persist,
        preventDefault: event.preventDefault,
        shiftKey: event.shiftKey,
        stopPropagation: event.stopPropagation,
        target: event.target,
        timeStamp: event.timeStamp,
        type: event.type,

        // Other properties and methods, added mostly for typing consistency
        button: 0,
        buttons: 1,
        clientX: 0,
        clientY: 0,
        getModifierState: () => false,
        movementX: 0,
        movementY: 0,
        nativeEvent: new MouseEvent('click'),
        pageX: 0,
        pageY: 0,
        relatedTarget: null,
        screenX: 0,
        screenY: 0,
      })

      if (shouldPropagate === false) {
        event.stopPropagation()
      }
    }
  }
}
