import {
  AbstractView,
  KeyboardEvent,
  KeyboardEventHandler,
  MouseEventHandler,
} from 'react'
import { Options } from '../typings'
import { combineKeysWithModifiers, shouldTriggerHandler } from '../utils/event'

/**
 * Based on Chrome 80.
 */
const BROWSER_TOP_BAR_HEIGHT_ESTIMATE = 80

export const createKeydownFromClick = <
  TElement extends HTMLElement = HTMLElement,
>(
  clickHandler: MouseEventHandler<TElement>,
  options: Options = {},
): KeyboardEventHandler<TElement> => {
  const {
    keys: optionsKeys,
    modifiers: globalModifiers = {},
    shouldPropagate = true,
  } = options

  const keys = optionsKeys
    ? optionsKeys.map(key => key.toLowerCase())
    : ['enter', ' ']

  const keyModifierCombos = combineKeysWithModifiers(keys, globalModifiers)

  return (event: KeyboardEvent<TElement>): void => {
    if (shouldTriggerHandler(keyModifierCombos, event)) {
      const element = event.currentTarget.getBoundingClientRect()

      const elementCenterClientX = Math.round(element.left + element.width / 2)

      const elementCenterClientY = Math.round(element.top + element.height / 2)

      const { x: bodyX, y: bodyY } = document.body.getBoundingClientRect()

      const elementCenterPageX = elementCenterClientX - bodyX

      const elementCenterPageY = elementCenterClientY - bodyY

      const elementCenterScreenX = window.screenLeft + elementCenterClientX

      const elementCenterScreenY =
        window.screenTop +
        BROWSER_TOP_BAR_HEIGHT_ESTIMATE +
        elementCenterClientY

      const mouseEventInit = {
        button: 0,
        buttons: 0,
        clientX: elementCenterClientX,
        clientY: elementCenterClientY,
        isTrusted: event.isTrusted,
        movementX: 0,
        movementY: 0,
        relatedTarget: null,
        screenX: elementCenterScreenX,
        screenY: elementCenterScreenY,
      }

      clickHandler({
        ...mouseEventInit,
        altKey: event.altKey,
        bubbles: event.bubbles,
        cancelable: event.cancelable,
        ctrlKey: event.ctrlKey,
        currentTarget: event.currentTarget,
        defaultPrevented: event.defaultPrevented,
        detail: 1,
        eventPhase: event.eventPhase,
        getModifierState: function (key: string) {
          if (
            (key === 'Alt' && event.altKey) ||
            (key === 'Control' && event.ctrlKey) ||
            (key === 'Meta' && event.metaKey) ||
            (key === 'Shift' && event.shiftKey)
          ) {
            return true
          }

          return false
        },
        isDefaultPrevented: event.isDefaultPrevented,
        isPropagationStopped: event.isPropagationStopped,
        metaKey: event.metaKey,
        nativeEvent: new MouseEvent('click', mouseEventInit),
        pageX: elementCenterPageX,
        pageY: elementCenterPageY,
        persist: event.persist,
        preventDefault: event.preventDefault,
        shiftKey: event.shiftKey,
        stopPropagation: event.stopPropagation,
        target: event.target,
        timeStamp: event.timeStamp,
        type: event.type,

        // TODO: come up with a good mock for `view.styleMedia`.
        view: window as unknown as AbstractView,
      })

      if (shouldPropagate === false) {
        event.stopPropagation()
      }
    }
  }
}
