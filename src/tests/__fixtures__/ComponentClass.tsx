import React from 'react'

import { createKeydownFromClick } from '../../api/createKeydownFromClick'
import { Options, FullEventHandler } from '../../typings'
import { DATA_TESTID } from '../utils'

export type ComponentClassProps = {
  onClick: FullEventHandler
  options?: Options
}

export class ComponentClass extends React.Component<ComponentClassProps> {
  private handleClick: FullEventHandler
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
