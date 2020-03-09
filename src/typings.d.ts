export type Modifiers = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type Modifier = keyof Modifiers

export type Options = {
  keys?: string[]
  modifiers?: Modifiers
  shouldPropagate?: boolean
}

export type HookOptions = {
  extraDependencies?: unknown[]
}

export { createKeydownFromClick } from './api/createKeydownFromClick'

export { useKeydownFromClick } from './api/useKeydownFromClick'
