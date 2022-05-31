import {
  Component,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react'

import { createKeydownFromClick } from '../../api/createKeydownFromClick'
import { Options } from '../../typings'

type Props = {
  onClick: MouseEventHandler
  options?: Options
}

export class ClassComponent extends Component<Props> {
  private handleKeyDown: KeyboardEventHandler

  public constructor(props: Props) {
    super(props)

    const { onClick, options } = props

    this.handleKeyDown = createKeydownFromClick(onClick, options)
  }

  public render(): ReactNode {
    return (
      <div
        onClick={this.props.onClick}
        onKeyDown={this.handleKeyDown}
        role="button"
        tabIndex={0}
      />
    )
  }
}
