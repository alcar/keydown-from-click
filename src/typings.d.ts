import { KeyboardEventHandler, MouseEventHandler } from 'react'

export type Modifiers = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type Modifier = keyof Modifiers

export type Options = {
  keys?: Array<string>
  modifiers?: Modifiers
  shouldPropagate?: boolean
}

export type HookOptions = {
  extraDependencies?: Array<unknown>
}

export const createKeydownFromClick: <
  TElement extends HTMLElement = HTMLElement,
>(
  clickHandler: MouseEventHandler<TElement>,
  options?: Options,
) => KeyboardEventHandler<TElement>

export const useKeydownFromClick: <TElement extends HTMLElement = HTMLElement>(
  clickHandler: MouseEventHandler<TElement>,
  options?: Options & HookOptions,
) => KeyboardEventHandler<TElement>
