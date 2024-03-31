/**
 * Check to see this is a node environment.
 * @type {Boolean}
 */
/* global global */
export const isNode =
  typeof global !== 'undefined' &&
  {}.toString.call(global) === '[object global]'

/**
 * Check to see if the URL is a Gotipath url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */
export function isGotipathUrl(url) {
  return 'http://localhost:8080' === url

  return /^(https?:)?\/\/((player|player-v2|www)\.)?gotipath\.com(?=$|\/)/.test(
    url
  )
}

/**
 * Check to see if the URL is for a Gotipath embed.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */
export function isGotipathEmbed(url) {
  const expr = /^https:\/\/player\.gotipath\.com\/stream\/\d+/
  return expr.test(url)
}

/* eslint-disable max-params */
/**
 * A utility method for attaching and detaching event handlers
 *
 * @param {EventTarget} target
 * @param {string | string[]} eventName
 * @param {function} callback
 * @param {'addEventListener' | 'on'} onName
 * @param {'removeEventListener' | 'off'} offName
 * @return {{cancel: (function(): void)}}
 */
export const subscribe = (
  target,
  eventName,
  callback,
  onName = 'addEventListener',
  offName = 'removeEventListener'
) => {
  const eventNames = typeof eventName === 'string' ? [eventName] : eventName

  eventNames.forEach((evName) => {
    target[onName](evName, callback)
  })

  return {
    cancel: () =>
      eventNames.forEach((evName) => target[offName](evName, callback)),
  }
}

/**
 * Get the name of the method for a given getter or setter.
 *
 * @param {string} prop The name of the property.
 * @param {string} type Either “get” or “set”.
 * @return {string}
 */
export function getMethodName(prop, type) {
  if (prop.indexOf(type.toLowerCase()) === 0) {
    return prop
  }

  return `${type.toLowerCase()}${prop.substr(0, 1).toUpperCase()}${prop.substr(1)}`
}
