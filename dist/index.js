/**
 * Check to see if the URL is a Vimeo url.
 *
 * @param {string} url The url string.
 * @return {boolean}
 */
function isGotipathUrl(url) {
  return /^(https?:)?\/\/((player|player-v2|www)\.)?gotipath\.com(?=$|\/)/.test(
    url
  )
}

const video = () => {
  console.log('video');
};

console.log(isGotipathUrl('https://player-v2.gotipath.com/12345'));

export { video };
