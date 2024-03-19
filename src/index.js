import { isGotipathUrl } from './lib/function'

const video = () => {
  console.log('video')
}

console.log(isGotipathUrl('https://player-v2.gotipath.com/12345'))

export { video }
