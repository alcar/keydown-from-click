import React from 'react'

export type Modifiers = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type Modifier = keyof Modifiers

type FullEvent<T extends HTMLElement = HTMLElement> = Modifiers &
  React.SyntheticEvent<T>

export type FullEventHandler<T extends HTMLElement = HTMLElement> = (
  FullEvent: FullEvent<T>,
) => void

export type Options = {
  keys?: string[]
  modifiers?: Modifiers
}

export type HookOptions = {
  extraDependencies?: unknown[]
}

export { createKeydownFromClick } from './api/createKeydownFromClick'

export { useKeydownFromClick } from './api/useKeydownFromClick'
