import React from 'react'

export type Modifiers = {
  altKey?: boolean
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
}

export type Modifier = keyof Modifiers

type PartialEvent = Pick<
  React.MouseEvent,
  Modifier | 'currentTarget' | 'target'
>

type PartialEventHandler = (partialEvent: PartialEvent) => void

export type Options = {
  keys?: string[]
  modifiers?: Modifiers
}

export type HookOptions = {
  extraDependencies?: unknown[]
}

export type KeydownHandlerCreator = (
  clickHandler: PartialEventHandler,
  options?: Options,
) => React.KeyboardEventHandler

export const createKeydownFromClick: KeydownHandlerCreator

export type KeydownHandlerCreatorHook = (
  clickHandler: PartialEventHandler,
  options?: Options & HookOptions,
) => React.KeyboardEventHandler

export const useKeydownFromClick: KeydownHandlerCreatorHook
