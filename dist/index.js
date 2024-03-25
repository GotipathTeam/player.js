/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */
/* global global */
const isNode =
  typeof global !== 'undefined' &&
  {}.toString.call(global) === '[object global]';

/**
 * Check to see if the URL is a Gotipath url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */
function isGotipathUrl(url) {
  return true
}

const arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';

const postMessageSupport =
  typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error(
    'Sorry, the Gotipath Player API is not available in this browser.'
  )
}

function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error);
      return {}
    }
  }

  return data
}

/**
 * Post a message to the specified target.
 *
 * @param {Player} player The player object to use.
 * @param {string} method The API method to call.
 * @param {object} params The parameters to send to the player.
 * @return {void}
 */
function postMessage(player, method, params) {
  if (
    !player.element.contentWindow ||
    !player.element.contentWindow.postMessage
  ) {
    return
  }

  let message = {
    method,
  };

  if (params !== undefined) {
    message.data = params;
  }
  var data = JSON.stringify(message);
  player.element.contentWindow.postMessage(data, 'https://player.gotipath.com');
}

function processData(player, data) {
  data = parseMessageData(data);
  if (!data || !data.event) {
    return
  }
}

class Player {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    if (
      element.nodeName === 'IFRAME' &&
      !isGotipathUrl(element.getAttribute('src') || '')
    ) {
      throw new Error('The player element passed isn’t a Gotipath embed.')
    }

    this._window = element.ownerDocument.defaultView;
    this.element = element;
    this.origin = '*'; // default origin

    new Promise((resolve, reject) => {
      this._onMessage = (event) => {
        if (
          !isGotipathUrl(event.origin) ||
          this.element.contentWindow !== event.source
        ) {
          return
        }
        if (this.origin === '*') {
          this.origin = event.origin;
        }

        const data = parseMessageData(event.data);
        const isError = data && data.event === 'error';
        const isReadyError =
          isError && data.data && data.data.method === 'ready';

        if (isReadyError) {
          const error = new Error(data.data.message);
          error.name = data.data.name;
          reject(error);
          return
        }

        const isReadyEvent = data && data.event === 'ready';

        // const data = JSON.parse(event.data)
        if (isReadyEvent) {
          resolve();
        }

        processData(this, data);
      };

      this._window.addEventListener('message', this._onMessage);
    });
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

    this.callMethod('addEventListener', eventName);
  }

  setCurrentTime(time) {
    let params = {
      currentTime: time,
    };
    postMessage(this, 'setCurrentTime', params);
  }

  play() {
    postMessage(this, 'play');
  }
  pause() {
    postMessage(this, 'pause');
  }
  mute() {
    postMessage(this, 'mute');
  }

  unmute() {
    postMessage(this, 'unmute');
  }
  setVolume(volume) {
    let params = {
      volume: volume,
    };
    postMessage(this, 'setVolume', params);
  }

  /**
   * Get a promise for a method.
   *
   * @param {string} name The API method to call.
   * @param {Object} [args={}] Arguments to send via postMessage.
   * @return {Promise}
   */
  callMethod(name, args = {}) {
    console.log('callMethod', name, args);
  }
  /**
   * Get a promise for the value of a player property.
   *
   * @param {string} name The property name
   * @return {Promise}
   */
  get(name) {
    console.log('get', name);
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

export { Player as default };
