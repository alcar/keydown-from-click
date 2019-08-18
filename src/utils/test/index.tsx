import { fireEvent, render } from '@testing-library/react'
import React from 'react'

import { ComponentClassProps } from '../../__fixtures__/ComponentClass'
import { FunctionComponentProps } from '../../__fixtures__/FunctionComponent'
import * as createKeydownFromClickModule from '../../createKeydownFromClick'
import { KeydownHandlerCreator, Modifier } from '../../typings'

import {
  MockedEvent,
  MockedEventWithModifiers,
  MockedEvents,
  TestHelpers,
} from './typings'

export const DATA_TESTID = 'component'

const KEYDOWN_EVENTS: MockedEvents = {
  a: { key: 'a' },
  enter: { key: 'Enter' },
  space: { key: ' ' },
  z: { key: 'z' },
}

const addModifiers = (
  modifiers: Modifier[],
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

const getRenderedComponent = (component: React.ReactElement): HTMLElement => {
  const { getByTestId } = render(component)

  return getByTestId(DATA_TESTID)
}

export const test = (
  suiteName: Parameters<jest.Describe>[0],
  Component:
    | React.ComponentClass<ComponentClassProps>
    | React.FC<FunctionComponentProps>,
): void => {
  describe(`${suiteName}`, () => {
    const { onClick, pressEnter } = createTestHelpers()

    let spiedCreateKeydownHandler: jest.MockInstance<
      ReturnType<KeydownHandlerCreator>,
      Parameters<KeydownHandlerCreator>
    >

    beforeEach(() => {
      spiedCreateKeydownHandler = jest.spyOn(
        createKeydownFromClickModule,
        'createKeydownFromClick',
      )
    })

    afterEach(() => {
      spiedCreateKeydownHandler.mockRestore()

      onClick.mockClear()
    })

    it('calls the handler on keydown', () => {
      const component = getRenderedComponent(<Component onClick={onClick} />)

      pressEnter(component)

      expect(onClick.mock.calls.length).toBe(1)
    })

    it('works with custom keys', () => {
      const component = getRenderedComponent(
        <Component
          onClick={onClick}
          options={{ keys: [KEYDOWN_EVENTS.a.key, KEYDOWN_EVENTS.z.key] }}
        />,
      )

      // Press 'a', 1st call
      fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

      expect(onClick.mock.calls.length).toBe(1)

      // Press 'z', 2nd call
      fireEvent.keyDown(component, KEYDOWN_EVENTS.z)

      expect(onClick.mock.calls.length).toBe(2)

      // Press Space, no extra calls
      fireEvent.keyDown(component, KEYDOWN_EVENTS.space)

      expect(onClick.mock.calls.length).toBe(2)

      // Press Enter, no extra calls
      pressEnter(component)

      expect(onClick.mock.calls.length).toBe(2)

      // Press 'a', 3rd call
      fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

      expect(onClick.mock.calls.length).toBe(3)
    })

    it('works with custom modifiers', () => {
      const component = getRenderedComponent(
        <Component
          onClick={onClick}
          options={{
            modifiers: { altKey: true, metaKey: false, shiftKey: true },
          }}
        />,
      )

      // Press Enter, no calls
      pressEnter(component)

      expect(onClick.mock.calls.length).toBe(0)

      // Press Alt + Enter, no calls

      pressEnter(component, ['altKey'])

      expect(onClick.mock.calls.length).toBe(0)

      // Press Alt + Shift + Enter, 1st call

      pressEnter(component, ['altKey', 'shiftKey'])

      expect(onClick.mock.calls.length).toBe(1)

      // Press Ctrl + Enter, no extra calls
      pressEnter(component, ['ctrlKey'])

      expect(onClick.mock.calls.length).toBe(1)

      // Press Alt + Shift + Enter, 2nd call

      pressEnter(component, ['altKey', 'shiftKey'])

      expect(onClick.mock.calls.length).toBe(2)

      // Press Shift + Enter, no extra calls
      pressEnter(component, ['shiftKey'])

      expect(onClick.mock.calls.length).toBe(2)

      // Press Alt + Shift + Enter, 3rd call

      pressEnter(component, ['altKey', 'shiftKey'])

      expect(onClick.mock.calls.length).toBe(3)
    })

    it('works with both custom keys and custom modifiers', () => {
      const component = getRenderedComponent(
        <Component
          onClick={onClick}
          options={{
            keys: [KEYDOWN_EVENTS.a.key],
            modifiers: { altKey: true, shiftKey: true },
          }}
        />,
      )

      // Press 'a', no calls
      fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

      expect(onClick.mock.calls.length).toBe(0)

      // Press Alt + 'a', no calls
      fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.a))

      expect(onClick.mock.calls.length).toBe(0)

      // Press Alt + Shift + 'a', 1st call
      fireEvent.keyDown(
        component,
        addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
      )

      expect(onClick.mock.calls.length).toBe(1)

      // Press Ctrl + 'a', no extra calls
      fireEvent.keyDown(component, addModifiers(['ctrlKey'], KEYDOWN_EVENTS.a))

      expect(onClick.mock.calls.length).toBe(1)

      // Press Alt + Shift + 'a', 2nd call
      fireEvent.keyDown(
        component,
        addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
      )

      expect(onClick.mock.calls.length).toBe(2)

      // Press Shift + 'a', no extra calls
      fireEvent.keyDown(component, addModifiers(['shiftKey'], KEYDOWN_EVENTS.a))

      expect(onClick.mock.calls.length).toBe(2)

      // Press Alt + Shift + 'a', 3rd call
      fireEvent.keyDown(
        component,
        addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
      )

      expect(onClick.mock.calls.length).toBe(3)
    })

    it('ignores invalid modifiers', () => {
      const INVALID_MODIFIER = 'invalidKey'

      const component = getRenderedComponent(
        <Component
          onClick={onClick}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          options={{ modifiers: { [INVALID_MODIFIER]: true } as any }}
        />,
      )

      pressEnter(component)

      expect(onClick.mock.calls.length).toBe(1)
    })
  })
}
