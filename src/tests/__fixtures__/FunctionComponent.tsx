import React from 'react'

import { useKeydownFromClick } from '../../api/useKeydownFromClick'
import { Options, HookOptions } from '../../typings'
import { DATA_TEST_ID } from '../consts'

export type FunctionComponentProps = {
  onClick: () => void
  options?: Options & HookOptions
}

export const FunctionComponent: React.FC<FunctionComponentProps> = ({
  onClick,
  options,
}) => {
  const handleKeyDown = useKeydownFromClick(onClick, options)

  return (
    <button
      data-testid={DATA_TEST_ID}
      onClick={onClick}
      onKeyDown={handleKeyDown}
    />
  )
}
