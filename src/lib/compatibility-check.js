import { isNode } from './function'

const arrayIndexOfSupport = typeof Array.prototype.indexOf !== 'undefined'

const postMessageSupport =
  typeof window !== 'undefined' && typeof window.postMessage !== 'undefined'

if (!isNode && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error(
    'Sorry, the Gotipath Player API is not available in this browser.'
  )
}
