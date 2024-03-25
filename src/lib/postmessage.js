import { getCallbacks } from './callbacks'
export function parseMessageData(data) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // If the message cannot be parsed, throw the error as a warning
      console.warn(error)
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
export function postMessage(player, method, params) {
  if (
    !player.element.contentWindow ||
    !player.element.contentWindow.postMessage
  ) {
    return
  }

  let message = {
    method,
  }

  if (params !== undefined) {
    message.data = params
  }
  var data = JSON.stringify(message)
  player.element.contentWindow.postMessage(data, 'https://player.gotipath.com')
}

export function processData(player, data) {
  data = parseMessageData(data)
  if (!data || !data.event) {
    return
  }
  let callbacks = []
}
