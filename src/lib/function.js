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
  return true

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
