import './lib/compatibility-check'
import { isGotipathUrl, getMethodName } from './lib/function'
import { parseMessageData, postMessage, processData } from './lib/postmessage'
import { getCallbacks, storeCallback } from './lib/callbacks'

class Player {
  constructor(element, options = {}) {
    this.element = element
    this.options = options
    if (
      element.nodeName === 'IFRAME' &&
      !isGotipathUrl(element.getAttribute('src') || '')
    ) {
      throw new Error('The player element passed isn’t a Gotipath embed.')
    }
    this.element = element
    this.origin = '*' // default origin

    this._onMessage = (event) => {
      if (
        !isGotipathUrl(event.origin) ||
        this.element.contentWindow !== event.source
      ) {
        return
      }

      if (this.origin === '*') {
        this.origin = event.origin
      }
      const data = parseMessageData(event.data)
      if (!data || !data.event) {
        return
      }
      processData(this, data)
    }
    window.addEventListener('message', this._onMessage)
    return this
  }

  on(eventName, callback) {
    if (!eventName) {
      throw new TypeError('You must pass an event name.')
    }
    if (!callback) {
      throw new TypeError('You must pass a callback function.')
    }

    if (typeof callback !== 'function') {
      throw new TypeError('The callback must be a function.')
    }
    const callbacks = getCallbacks(this, `event:${eventName}`)

    if (callbacks.length != 0) {
      return
    }
    storeCallback(this, `event:${eventName}`, callback)
  }

  play() {
    postMessage(this, 'play')
  }

  pause() {
    postMessage(this, 'pause')
  }
  /**
   * @param {number} currentTime
   * @return {SetCurrentTimePromise}
   */
  setCurrentTime(currentTime) {
    postMessage(this, 'setCurrentTime', {
      currentTime,
    })
  }

  mute() {
    postMessage(this, 'mute')
  }

  unmute() {
    postMessage(this, 'unmute')
  }
}

export default Player
