import React from 'react'

import { KeydownHandlerCreator, Modifier, Modifiers } from '../typings'

const MODIFIERS: Modifier[] = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey']

const compareModifiers = (
  modifiers: Modifiers,
  event: React.KeyboardEvent,
): boolean =>
  Object.entries(modifiers).reduce<boolean>(
    (acc, [currModifierKey, currModifierValue]) => {
      const currTypecastedModifierKey = currModifierKey as Modifier

      if (
        typeof currModifierValue !== 'boolean' ||
        !MODIFIERS.includes(currTypecastedModifierKey)
      ) {
        return acc
      }

      return acc && event[currTypecastedModifierKey] === currModifierValue
    },
    true,
  )

export const createKeydownFromClick: KeydownHandlerCreator = (
  clickHandler,
  options = {},
) => (event: React.KeyboardEvent): void => {
  const { keys: optionsKeys, modifiers = {} } = options

  const keys = optionsKeys
    ? optionsKeys.map(key => key.toLowerCase())
    : ['enter']

  const areSameModifiers = compareModifiers(modifiers, event)

  const eventKey = event.key.toLowerCase()

  if (areSameModifiers && keys.includes(eventKey)) {
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
