import React from 'react'

export type Modifiers = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type Modifier = keyof Modifiers

type FullEvent<T = Element> = Modifiers & React.SyntheticEvent<T>

type FullEventHandler<T = Element> = (FullEvent: FullEvent<T>) => void

export type Options = {
  keys?: string[]
  modifiers?: Modifiers
}

export type HookOptions = {
  extraDependencies?: unknown[]
}

export type KeydownHandlerCreator<T = Element> = (
  clickHandler: FullEventHandler<T>,
  options?: Options,
) => React.KeyboardEventHandler

export const createKeydownFromClick: KeydownHandlerCreator

export type KeydownHandlerCreatorHook<T = Element> = (
  clickHandler: FullEventHandler<T>,
  options?: Options & HookOptions,
) => React.KeyboardEventHandler

export const useKeydownFromClick: KeydownHandlerCreatorHook
