import { render, screen } from '@testing-library/react'

import * as createKeydownFromClickModule from '../api/createKeydownFromClick'

import { FunctionComponent } from './__fixtures__/FunctionComponent'
import { createTestHelpers } from './utils'

const { onClick, pressEnter } = createTestHelpers()

let spiedCreateKeydownFromClick: jest.MockInstance<
  ReturnType<typeof createKeydownFromClickModule.createKeydownFromClick>,
  Parameters<typeof createKeydownFromClickModule.createKeydownFromClick>
>

beforeAll(() => {
  spiedCreateKeydownFromClick = jest.spyOn(
    createKeydownFromClickModule,
    'createKeydownFromClick',
  )
})

afterEach(() => {
  spiedCreateKeydownFromClick.mockClear()

  onClick.mockClear()
})

it('memoizes the handler creation', () => {
  const { rerender } = render(<FunctionComponent onClick={onClick} />)

  const component = screen.getByRole('button')

  pressEnter(component)

  rerender(<FunctionComponent onClick={onClick} />)

  pressEnter(component)
  pressEnter(component)

  rerender(<FunctionComponent onClick={onClick} />)

  pressEnter(component)

  expect(spiedCreateKeydownFromClick).toHaveBeenCalledTimes(1)
})

it('works with extra hook dependencies', () => {
  const extraDependencies1 = [0, 1]
  const extraDependencies2 = [1, 2]
  const extraDependencies3 = [2, 3]

  // Initial render, 1st call
  const { rerender } = render(
    <FunctionComponent
      onClick={onClick}
      options={{ extraDependencies: extraDependencies1 }}
    />,
  )

  expect(spiedCreateKeydownFromClick).toHaveBeenCalledTimes(1)

  // Changes to dependencies, 2nd call
  rerender(
    <FunctionComponent
      onClick={onClick}
      options={{ extraDependencies: extraDependencies2 }}
    />,
  )

  expect(spiedCreateKeydownFromClick).toHaveBeenCalledTimes(2)

  // No changes to dependencies
  rerender(
    <FunctionComponent
      onClick={onClick}
      options={{ extraDependencies: extraDependencies2 }}
    />,
  )

  expect(spiedCreateKeydownFromClick).toHaveBeenCalledTimes(2)

  // No changes to dependencies
  rerender(
    <FunctionComponent
      onClick={onClick}
      options={{ extraDependencies: extraDependencies2 }}
    />,
  )

  expect(spiedCreateKeydownFromClick).toHaveBeenCalledTimes(2)

  // Changes to dependencies, 3rd call
  rerender(
    <FunctionComponent
      onClick={onClick}
      options={{ extraDependencies: extraDependencies3 }}
    />,
  )

  expect(spiedCreateKeydownFromClick).toHaveBeenCalledTimes(3)
})
