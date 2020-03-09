import React from 'react'

import { createKeydownFromClick } from '../../api/createKeydownFromClick'
import { Options } from '../../typings'
import { DATA_TEST_ID } from '../utils'

export type ComponentClassProps = {
  onClick: React.MouseEventHandler
  options?: Options
}

export class ComponentClass extends React.Component<ComponentClassProps> {
  private handleClick: React.MouseEventHandler
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
        data-testid={DATA_TEST_ID}
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
