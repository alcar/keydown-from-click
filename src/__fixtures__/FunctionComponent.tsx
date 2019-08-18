import React from 'react'

import { Options, HookOptions } from '../typings'
import { useKeydownFromClick } from '../useKeydownFromClick'
import { DATA_TESTID } from '../utils/test'

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
      data-testid={DATA_TESTID}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    />
  )
}
