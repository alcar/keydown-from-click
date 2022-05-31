import { fireEvent, render, screen } from '@testing-library/react'

import * as consoleModule from '../utils/console'
import * as eventUtilsModule from '../utils/event'

import { ClassComponent } from './__fixtures__/ClassComponent'
import { KEYDOWN_EVENTS } from './consts'
import { addModifiers, createTestHelpers } from './utils'

const { onClick, pressEnter } = createTestHelpers()

let spiedConsoleWarn: jest.MockInstance<
  ReturnType<Console['warn']>,
  Parameters<Console['warn']>
>

beforeAll(() => {
  spiedConsoleWarn = jest
    .spyOn(consoleModule, 'warn')
    .mockImplementation(() => {
      return
    })
})

afterEach(() => {
  spiedConsoleWarn.mockClear()

  onClick.mockClear()
})

it('calls the handler with Enter and Space by default', () => {
  render(<ClassComponent onClick={onClick} />)

  const component = screen.getByRole('button')

  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(1)

  fireEvent.keyDown(component, KEYDOWN_EVENTS.space)

  expect(onClick).toHaveBeenCalledTimes(2)
})

it('works with custom keys', () => {
  render(
    <ClassComponent
      onClick={onClick}
      options={{ keys: [KEYDOWN_EVENTS.a.key, KEYDOWN_EVENTS.z.key] }}
    />,
  )

  const component = screen.getByRole('button')

  // Press 'a', 1st call
  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press 'z', 2nd call
  fireEvent.keyDown(component, KEYDOWN_EVENTS.z)

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Space, no extra calls
  fireEvent.keyDown(component, KEYDOWN_EVENTS.space)

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Enter, no extra calls
  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press 'a', 3rd call
  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(3)
})

it('works with custom keys with inline modifiers', () => {
  render(
    <ClassComponent
      onClick={onClick}
      options={{
        keys: [
          `shift + ${KEYDOWN_EVENTS.a.key}`,
          `alt + ctrl + ${KEYDOWN_EVENTS.z.key}`,
          KEYDOWN_EVENTS.enter.key,
        ],
      }}
    />,
  )

  const component = screen.getByRole('button')

  // Press 'a', no calls
  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + 'a', no calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Shift + 'a', 1st call
  fireEvent.keyDown(component, addModifiers(['shiftKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Shift + 'a', no extra calls
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
  )

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + 'z', no extra calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.z))

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Ctrl + 'z', 2nd call
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'ctrlKey'], KEYDOWN_EVENTS.z),
  )

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Ctrl + Enter, no extra calls
  pressEnter(component, ['ctrlKey'])

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Enter, 3rd call
  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(3)
})

it('handles extra whitespace in custom keys (including Space)', () => {
  render(
    <ClassComponent
      onClick={onClick}
      options={{
        keys: [
          `  shift    +  ${KEYDOWN_EVENTS.a.key} `,
          `     alt  +   ctrl  +   ${KEYDOWN_EVENTS.z.key}`,
          `${KEYDOWN_EVENTS.enter.key}   `,
          `   ${KEYDOWN_EVENTS.space.key}   `,
        ],
      }}
    />,
  )

  const component = screen.getByRole('button')

  // Press 'a', no calls
  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + 'a', no calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Shift + 'a', 1st call
  fireEvent.keyDown(component, addModifiers(['shiftKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Shift + 'a', no extra calls
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
  )

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + 'z', no extra calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.z))

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Ctrl + 'z', 2nd call
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'ctrlKey'], KEYDOWN_EVENTS.z),
  )

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Ctrl + Enter, no extra calls
  pressEnter(component, ['ctrlKey'])

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Enter, 3rd call
  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(3)

  // Press Meta + Space, no extra calls
  fireEvent.keyDown(component, addModifiers(['metaKey'], KEYDOWN_EVENTS.space))

  expect(onClick).toHaveBeenCalledTimes(3)

  // Press Space, 4th call
  fireEvent.keyDown(component, KEYDOWN_EVENTS.space)

  expect(onClick).toHaveBeenCalledTimes(4)
})

it('works with custom global modifiers', () => {
  render(
    <ClassComponent
      onClick={onClick}
      options={{
        modifiers: { altKey: true, metaKey: false, shiftKey: true },
      }}
    />,
  )

  const component = screen.getByRole('button')

  // Press Enter, no calls
  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + Enter, no calls
  pressEnter(component, ['altKey'])

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + Shift + Enter, 1st call
  pressEnter(component, ['altKey', 'shiftKey'])

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Ctrl + Enter, no extra calls
  pressEnter(component, ['ctrlKey'])

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Shift + Enter, 2nd call
  pressEnter(component, ['altKey', 'shiftKey'])

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Shift + Enter, no extra calls
  pressEnter(component, ['shiftKey'])

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Alt + Shift + Enter, 3rd call
  pressEnter(component, ['altKey', 'shiftKey'])

  expect(onClick).toHaveBeenCalledTimes(3)
})

it('works with both custom keys and custom global modifiers', () => {
  render(
    <ClassComponent
      onClick={onClick}
      options={{
        keys: [KEYDOWN_EVENTS.a.key],
        modifiers: { altKey: true, shiftKey: true },
      }}
    />,
  )

  const component = screen.getByRole('button')

  // Press 'a', no calls
  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + 'a', no calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + Shift + 'a', 1st call
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
  )

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Ctrl + 'a', no extra calls
  fireEvent.keyDown(component, addModifiers(['ctrlKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Shift + 'a', 2nd call
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
  )

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Shift + 'a', no extra calls
  fireEvent.keyDown(component, addModifiers(['shiftKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Alt + Shift + 'a', 3rd call
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'shiftKey'], KEYDOWN_EVENTS.a),
  )

  expect(onClick).toHaveBeenCalledTimes(3)
})

it('works with both custom keys with inline modifiers and custom global modifiers', () => {
  render(
    <ClassComponent
      onClick={onClick}
      options={{
        keys: [
          `shift + ${KEYDOWN_EVENTS.a.key}`,
          `alt + ctrl + ${KEYDOWN_EVENTS.z.key}`,
          KEYDOWN_EVENTS.enter.key,
        ],
        modifiers: { metaKey: true, shiftKey: false },
      }}
    />,
  )

  const component = screen.getByRole('button')

  // Press 'a', no calls
  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Alt + 'a', no calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Shift + 'a', no calls
  fireEvent.keyDown(component, addModifiers(['shiftKey'], KEYDOWN_EVENTS.a))

  expect(onClick).toHaveBeenCalledTimes(0)

  // Press Meta + Shift + 'a', 1st call (inline Shift > global Shift)
  fireEvent.keyDown(
    component,
    addModifiers(['metaKey', 'shiftKey'], KEYDOWN_EVENTS.a),
  )

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + 'z', no extra calls
  fireEvent.keyDown(component, addModifiers(['altKey'], KEYDOWN_EVENTS.z))

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Ctrl + 'z', no extra calls
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'ctrlKey'], KEYDOWN_EVENTS.z),
  )

  expect(onClick).toHaveBeenCalledTimes(1)

  // Press Alt + Ctrl + Meta + 'z', 2nd call
  fireEvent.keyDown(
    component,
    addModifiers(['altKey', 'ctrlKey', 'metaKey'], KEYDOWN_EVENTS.z),
  )

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Enter, no extra calls
  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(2)

  // Press Meta + Enter, 3rd call
  pressEnter(component, ['metaKey'])

  expect(onClick).toHaveBeenCalledTimes(3)
})

it('evaluates and validates keys and modifiers from options only once', () => {
  const spiedCombineKeysWithModifiers = jest.spyOn(
    eventUtilsModule,
    'combineKeysWithModifiers',
  )

  expect(spiedCombineKeysWithModifiers).toHaveBeenCalledTimes(0)

  render(
    <ClassComponent
      onClick={onClick}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={{
        keys: [
          KEYDOWN_EVENTS.a.key,
          `shift + ${KEYDOWN_EVENTS.z.key}`,
          KEYDOWN_EVENTS.enter.key,
        ],
        modifiers: { altKey: true },
      }}
    />,
  )

  const component = screen.getByRole('button')

  expect(spiedCombineKeysWithModifiers).toHaveBeenCalledTimes(1)

  pressEnter(component)

  expect(spiedCombineKeysWithModifiers).toHaveBeenCalledTimes(1)

  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(spiedCombineKeysWithModifiers).toHaveBeenCalledTimes(1)

  fireEvent.keyDown(component, addModifiers(['shiftKey'], KEYDOWN_EVENTS.z))

  expect(spiedCombineKeysWithModifiers).toHaveBeenCalledTimes(1)

  spiedCombineKeysWithModifiers.mockClear()
})

it('ignores keys with invalid inline modifiers and warns user', () => {
  const INVALID_MODIFIER = 'invalidKey'

  expect(spiedConsoleWarn).toHaveBeenCalledTimes(0)

  render(
    <ClassComponent
      onClick={onClick}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={{
        keys: [
          `${INVALID_MODIFIER} + ${KEYDOWN_EVENTS.enter.key}`,
          KEYDOWN_EVENTS.a.key,
        ],
      }}
    />,
  )

  const component = screen.getByRole('button')

  expect(spiedConsoleWarn).toHaveBeenCalledTimes(1)

  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(0)

  fireEvent.keyDown(component, KEYDOWN_EVENTS.a)

  expect(onClick).toHaveBeenCalledTimes(1)

  pressEnter(component)
})

it('ignores invalid global modifiers and warns user', () => {
  const INVALID_MODIFIER = 'invalidKey'

  expect(spiedConsoleWarn).toHaveBeenCalledTimes(0)

  render(
    <ClassComponent
      onClick={onClick}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options={{ modifiers: { [INVALID_MODIFIER]: true } as any }}
    />,
  )

  const component = screen.getByRole('button')

  expect(spiedConsoleWarn).toHaveBeenCalledTimes(1)

  pressEnter(component)

  expect(onClick).toHaveBeenCalledTimes(1)
})

it('propagates the event by default', () => {
  const parentKeydownHandlerMock = jest.fn()

  render(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onKeyDown={parentKeydownHandlerMock}>
      <ClassComponent onClick={onClick} />
    </div>,
  )

  const childComponent = screen.getByRole('button')

  expect(parentKeydownHandlerMock).toHaveBeenCalledTimes(0)

  pressEnter(childComponent)

  expect(parentKeydownHandlerMock).toHaveBeenCalledTimes(1)
})

it('does not propagate the event when shouldPropagate is false', () => {
  const parentKeydownHandlerMock = jest.fn()

  render(
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onKeyDown={parentKeydownHandlerMock}>
      <ClassComponent onClick={onClick} options={{ shouldPropagate: false }} />
    </div>,
  )

  const childComponent = screen.getByRole('button')

  expect(parentKeydownHandlerMock).toHaveBeenCalledTimes(0)

  pressEnter(childComponent)

  expect(parentKeydownHandlerMock).toHaveBeenCalledTimes(0)
})
