import React from 'react'

import { useKeydownFromClick } from '../../api/useKeydownFromClick'
import { Options, HookOptions } from '../../typings'
import { DATA_TEST_ID } from '../utils'

export type FunctionComponentProps = {
  onClick: () => void
  options?: Options & HookOptions
}

export const FunctionComponent: React.FC<FunctionComponentProps> = ({
  onClick,
  options,
}) => {
  const handleClick = React.useCallback(onClick, [])

  const handleKeyDown = useKeydownFromClick(handleClick, options)

  return (
    <div
      data-testid={DATA_TEST_ID}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    />
  )
}
