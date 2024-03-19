/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */
export function isGotipathUrl(url) {
  return /^(https?:)?\/\/((player|player-v2|www)\.)?gotipath\.com(?=$|\/)/.test(
    url
  )
}

/**
 * Check to see if the URL is for a Vimeo embed.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */
export function isGotipathEmbed(url) {
  const expr = /^https:\/\/player\.gotipath\.com\/stream\/\d+/
  return expr.test(url)
}
