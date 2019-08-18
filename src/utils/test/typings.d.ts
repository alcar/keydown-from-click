import { FireFunction } from '@testing-library/react'

import { Modifier, Modifiers } from '../../typings'

export type MockedEvent = { key: KeyboardEvent['key'] }

export type MockedEventWithModifiers = MockedEvent & Modifiers

export type MockedEvents = Record<string, MockedEvent>

export type TestHelpers = {
  onClick: jest.Mock
  pressEnter: (
    target: Parameters<FireFunction>[0],
    modifiers?: Modifier[],
  ) => void
}
