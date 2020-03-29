import React from 'react'

import { createKeydownFromClick } from '../../api/createKeydownFromClick'
import { Options } from '../../typings'
import { DATA_TEST_ID } from '../consts'

export type ComponentClassProps = {
  onClick: React.MouseEventHandler
  options?: Options
}

export class ComponentClass extends React.Component<ComponentClassProps> {
  private handleKeyDown: React.KeyboardEventHandler

  public constructor(props: ComponentClassProps) {
    super(props)

    const { onClick, options } = props

    this.handleKeyDown = createKeydownFromClick(onClick, options)
  }

  public render(): React.ReactNode {
    return (
      <button
        data-testid={DATA_TEST_ID}
        onClick={this.props.onClick}
        onKeyDown={this.handleKeyDown}
      />
    )
  }
}
