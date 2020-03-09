import { Modifier, Modifiers } from '../../typings'
import { warn } from '../console'

import { KeyModifierCombination } from './typings'

const MODIFIERS = ['altKey', 'ctrlKey', 'metaKey', 'shiftKey']

const defaultModifiers: Modifiers = MODIFIERS.reduce(
  (acc, currModifierName) => ({ ...acc, [currModifierName]: false }),
  {},
)

const isValidModifierName = (maybeModifier: string): boolean =>
  MODIFIERS.includes(maybeModifier)

const validateModifiers = (modifiers: Modifiers): Modifiers =>
  Object.entries(modifiers).reduce(
    (acc, [currModifierName, currModifierValue]) => {
      if (isValidModifierName(currModifierName) === false) {
        warn(
          `'${currModifierName}' is an invalid modifier and, therefore, will be ignored.`,
        )

        return acc
      }

      if (typeof currModifierValue !== 'boolean') {
        return acc
      }

      return { ...acc, [currModifierName]: currModifierValue }
    },
    {},
  )

export const combineKeysWithModifiers = (
  keySets: string[],
  globalModifiers: Modifiers,
): KeyModifierCombination[] =>
  keySets.reduce<KeyModifierCombination[]>((keyComboArrayAcc, currKeySet) => {
    const splitKeyCombination = currKeySet.split('+')

    const currKeyCombo = splitKeyCombination.reduce<KeyModifierCombination | null>(
      (keyComboAcc, currKeyPart, currIndex) => {
        if (keyComboAcc === null) {
          return keyComboAcc
        }

        if (currIndex === splitKeyCombination.length - 1) {
          const hasOnlyWhitespace = /^\s+$/.test(currKeyPart)

          const key = hasOnlyWhitespace ? ' ' : currKeyPart.trim()

          return { ...keyComboAcc, key }
        }

        const maybeModifierName = currKeyPart.trim() + 'Key'

        if (isValidModifierName(maybeModifierName) === false) {
          warn(
            `'${currKeySet}' has one or more invalid modifiers and, therefore, will be ignored.`,
          )

          return null
        }

        return {
          ...keyComboAcc,
          modifiers: { ...keyComboAcc.modifiers, [maybeModifierName]: true },
        }
      },
      { key: '', modifiers: validateModifiers(globalModifiers) },
    )

    if (currKeyCombo === null) {
      return keyComboArrayAcc
    }

    return [...keyComboArrayAcc, currKeyCombo]
  }, [])

const areSameModifiers = (
  modifiers: Modifiers,
  event: React.KeyboardEvent,
): boolean => {
  const completeModifiers = { ...defaultModifiers, ...modifiers }

  return Object.entries(completeModifiers).reduce<boolean>(
    (acc, [currModifierKey, currModifierValue]) =>
      acc && event[currModifierKey as Modifier] === currModifierValue,
    true,
  )
}

export const shouldTriggerHandler = (
  keyModifierCombos: KeyModifierCombination[],
  event: React.KeyboardEvent,
): boolean =>
  keyModifierCombos.reduce<boolean>(
    (acc, { key: currKey, modifiers: currModifiers }) => {
      if (acc === true) {
        return acc
      }

      const isSameKey = currKey === event.key.toLowerCase()

      const shouldTrigger = isSameKey && areSameModifiers(currModifiers, event)

      return acc || shouldTrigger
    },
    false,
  )
