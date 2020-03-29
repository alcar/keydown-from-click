import { Modifier, Modifiers } from '../../typings'
import { warn } from '../console'

import { KeyModifiersCombination } from './typings'

const DEFAULT_MODIFIERS: Modifiers = {
  altKey: false,
  ctrlKey: false,
  metaKey: false,
  shiftKey: false,
}

const modifiersNames = Object.keys(DEFAULT_MODIFIERS)

const isValidModifierName = (
  maybeModifier: string | Modifier,
): maybeModifier is Modifier => modifiersNames.includes(maybeModifier)

const validateModifiers = (modifiers: Modifiers): Modifiers =>
  Object.entries(modifiers).reduce<Modifiers>(
    (acc, [modifierName, modifierValue]) => {
      if (isValidModifierName(modifierName) === false) {
        warn(
          `'${modifierName}' is an invalid modifier and, therefore, will be ignored.`,
        )
      } else if (typeof modifierValue === 'boolean') {
        acc[modifierName as Modifier] = modifierValue
      }

      return acc
    },
    {},
  )

export const combineKeysWithModifiers = (
  keySets: Array<string>,
  globalModifiers: Modifiers,
): Array<KeyModifiersCombination> => {
  const validGlobalModifiers = validateModifiers(globalModifiers)

  return keySets.reduce<Array<KeyModifiersCombination>>(
    (combinationArrayAcc, keySet) => {
      const splitKeyCombination = keySet.split('+')

      const keyModifiersCombination = splitKeyCombination.reduce<KeyModifiersCombination | null>(
        (combinationAcc, keyPart, index) => {
          if (combinationAcc === null) {
            return combinationAcc
          }

          if (index === splitKeyCombination.length - 1) {
            const hasOnlyWhitespace = /^\s+$/.test(keyPart)

            const key = hasOnlyWhitespace ? ' ' : keyPart.trim()

            return { ...combinationAcc, key }
          }

          const maybeModifierName = keyPart.trim() + 'Key'

          if (isValidModifierName(maybeModifierName) === false) {
            warn(
              `'${keySet}' has one or more invalid modifiers and, therefore, will be ignored.`,
            )

            return null
          }

          return {
            ...combinationAcc,
            modifiers: {
              ...combinationAcc.modifiers,
              [maybeModifierName]: true,
            },
          }
        },
        { key: '', modifiers: validGlobalModifiers },
      )

      if (keyModifiersCombination === null) {
        return combinationArrayAcc
      }

      return [...combinationArrayAcc, keyModifiersCombination]
    },
    [],
  )
}

const areSameModifiers = (
  modifiers: Modifiers,
  event: React.KeyboardEvent,
): boolean => {
  const completeModifiers = { ...DEFAULT_MODIFIERS, ...modifiers }

  const completeModifiersEntries = Object.entries(completeModifiers)

  for (let i = 0; i < completeModifiersEntries.length; i++) {
    const [modifierKey, modifierValue] = completeModifiersEntries[i]

    if (event[modifierKey as Modifier] !== modifierValue) {
      return false
    }
  }

  return true
}

export const shouldTriggerHandler = (
  keyModifierCombos: Array<KeyModifiersCombination>,
  event: React.KeyboardEvent,
): boolean => {
  for (let i = 0; i < keyModifierCombos.length; i++) {
    const { key, modifiers } = keyModifierCombos[i]

    const isSameKey = key === event.key.toLowerCase()

    if (isSameKey && areSameModifiers(modifiers, event)) {
      return true
    }
  }

  return false
}
