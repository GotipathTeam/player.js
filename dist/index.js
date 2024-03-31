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
  return 'http://localhost:8080' === url
}

const arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined';

const postMessageSupport =
  typeof window !== 'undefined' && typeof window.postMessage !== 'undefined';

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error(
    'Sorry, the Gotipath Player API is not available in this browser.'
  )
}

/**
 * @module lib/callbacks
 */

const callbackMap = new WeakMap();

/**
 * Store a callback for a method or event for a player.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name.
 * @param {(function(this:Player, *): void|{resolve: function, reject: function})} callback
 *        The callback to call or an object with resolve and reject functions for a promise.
 * @return {void}
 */
function storeCallback(player, name, callback) {
  const playerCallbacks = callbackMap.get(player.element) || {};

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = [];
  }

  playerCallbacks[name].push(callback);

  callbackMap.set(player.element, playerCallbacks);
}

/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */
function getCallbacks(player, name) {
  const playerCallbacks = callbackMap.get(player.element) || {};

  return playerCallbacks[name] || []
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
  console.log('data', data);
  player.element.contentWindow.postMessage(data, player.origin);
}

function processData(player, data) {
  var callbacks = getCallbacks(player, `event:${data.event}`);
  if (callbacks.length === 0) {
    return
  }
  callbacks.forEach((callback) => {
    if (typeof callback === 'function') {
      if (data.data) {
        callback(data.data);
      } else {
        callback();
      }
    }
  });
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
    this.element = element;
    this.origin = '*'; // default origin

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
      if (!data || !data.event) {
        return
      }
      processData(this, data);
    };
    window.addEventListener('message', this._onMessage);
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
    const callbacks = getCallbacks(this, `event:${eventName}`);

    if (callbacks.length != 0) {
      return
    }
    storeCallback(this, `event:${eventName}`, callback);
  }

  play() {
    postMessage(this, 'play');
  }

  pause() {
    postMessage(this, 'pause');
  }
  /**
   * @param {number} currentTime
   * @return {SetCurrentTimePromise}
   */
  setCurrentTime(currentTime) {
    postMessage(this, 'setCurrentTime', {
      currentTime,
    });
  }

  mute() {
    postMessage(this, 'mute');
  }

  unmute() {
    postMessage(this, 'unmute');
  }
}

export { Player as default };
