import { fireEvent, render } from '@testing-library/react'

import { Modifier } from '../typings'

import { DATA_TEST_ID, KEYDOWN_EVENTS } from './consts'
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

export const getRenderedComponent = (
  component: React.ReactElement,
): HTMLElement => {
  const { getByTestId } = render(component)

  return getByTestId(DATA_TEST_ID)
}
