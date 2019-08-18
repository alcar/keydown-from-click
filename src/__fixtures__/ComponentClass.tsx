import React from 'react'

import { createKeydownFromClick } from '../createKeydownFromClick'
import { Options, PartialEventHandler } from '../typings'
import { DATA_TESTID } from '../utils/test'

export type ComponentClassProps = {
  onClick: PartialEventHandler
  options?: Options
}

export class ComponentClass extends React.Component<ComponentClassProps> {
  private handleClick: PartialEventHandler
  private handleKeyDown: React.KeyboardEventHandler

  public constructor(props: ComponentClassProps) {
    super(props)

    const { onClick, options } = props

    this.handleClick = onClick

    this.handleKeyDown = createKeydownFromClick(this.handleClick, options)
  }

  public render(): React.ReactNode {
    return (
      <div
        data-testid={DATA_TESTID}
        onClick={this.handleClick}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex={0}
      >
        lala
      </div>
    )
  }
}
