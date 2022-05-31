import { fireEvent } from '@testing-library/react'

import { Modifier } from '../typings'

import { KEYDOWN_EVENTS } from './consts'
import { MockedEvent, MockedEventWithModifiers, TestHelpers } from './typings'

export const addModifiers = (
  modifiers: Array<Modifier>,
  event: MockedEvent,
): MockedEventWithModifiers => ({
  ...event,
  ...modifiers.reduce(
    (acc, currModifier) => ({ ...acc, [currModifier]: true }),
    {},
  ),
})

export const createTestHelpers = (): TestHelpers => {
  const onClick = jest.fn()

  const pressEnter: TestHelpers['pressEnter'] = (target, modifiers = []) => {
    fireEvent.keyDown(target, addModifiers(modifiers, KEYDOWN_EVENTS.enter))
  }

  return { onClick, pressEnter }
}
