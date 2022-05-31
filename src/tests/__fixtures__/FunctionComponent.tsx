import { FC } from 'react'

import { useKeydownFromClick } from '../../api/useKeydownFromClick'
import { Options, HookOptions } from '../../typings'

type Props = {
  onClick: () => void
  options?: Options & HookOptions
}

export const FunctionComponent: FC<Props> = ({ onClick, options }) => {
  const handleKeyDown = useKeydownFromClick(onClick, options)

  return (
    <div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    />
  )
}
