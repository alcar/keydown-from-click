import { render } from '@testing-library/react'
import React from 'react'

import { FunctionComponent } from '../__fixtures__/FunctionComponent'
import * as createKeydownFromClickModule from '../createKeydownFromClick'
import { KeydownHandlerCreator } from '../typings'
import { DATA_TESTID, createTestHelpers, test } from '../utils/test'

test('useKeydownFromClick: general tests', FunctionComponent)

describe('useKeydownFromClick: hook tests', () => {
  const { onClick, pressEnter } = createTestHelpers()

  let spiedCreateKeydownFromClick: jest.MockInstance<
    ReturnType<KeydownHandlerCreator>,
    Parameters<KeydownHandlerCreator>
  >

  beforeEach(() => {
    spiedCreateKeydownFromClick = jest.spyOn(
      createKeydownFromClickModule,
      'createKeydownFromClick',
    )
  })

  afterEach(() => {
    spiedCreateKeydownFromClick.mockRestore()

    onClick.mockClear()
  })

  it('memoizes the handler creation', () => {
    const { getByTestId, rerender } = render(
      <FunctionComponent onClick={onClick} />,
    )

    const component = getByTestId(DATA_TESTID)

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
})
