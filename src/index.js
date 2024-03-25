import './lib/compatibility-check'
import { isGotipathUrl } from './lib/function'
import { parseMessageData, postMessage, processData } from './lib/postmessage'

const playerMap = new WeakMap()
const readyMap = new WeakMap()

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

    this._window = element.ownerDocument.defaultView
    this.element = element
    this.origin = '*' // default origin

    const readyPromise = new Promise((resolve, reject) => {
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
        const isError = data && data.event === 'error'
        const isReadyError =
          isError && data.data && data.data.method === 'ready'

        if (isReadyError) {
          const error = new Error(data.data.message)
          error.name = data.data.name
          reject(error)
          return
        }

        const isReadyEvent = data && data.event === 'ready'

        // const data = JSON.parse(event.data)
        if (isReadyEvent) {
          resolve()
        }

        processData(this, data)
      }

      this._window.addEventListener('message', this._onMessage)
    })
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

    this.callMethod('addEventListener', eventName)
  }

  setCurrentTime(time) {
    let params = {
      currentTime: time,
    }
    postMessage(this, 'setCurrentTime', params)
  }

  play() {
    postMessage(this, 'play')
  }
  pause() {
    postMessage(this, 'pause')
  }
  mute() {
    postMessage(this, 'mute')
  }

  unmute() {
    postMessage(this, 'unmute')
  }
  setVolume(volume) {
    let params = {
      volume: volume,
    }
    postMessage(this, 'setVolume', params)
  }

  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */
  callMethod(name, args = {}) {
    console.log('callMethod', name, args)
  }
  /**
   * Get a promise for the value of a player property.
   *
   * @param {string} name The property name
   * @return {Promise}
   */
  get(name) {
    console.log('get', name)
  }
  /**
   * Get a promise for setting the value of a player property.
   *
   * @param {string} name The API method to call.
   * @param {mixed} value The value to set.
   * @return {Promise}
   */
  set(name, value) {}
}

export default Player
