export const callbackMap = new WeakMap()

export function storeCallback(player, name, callback) {
  const playerCallbacks = callbackMap.get(player.element) || {}

  if (!(name in playerCallbacks)) {
    playerCallbacks[name] = []
  }

  playerCallbacks[name].push(callback)
  callbackMap.set(player.element, playerCallbacks)
}

/**
 * Get the callbacks for a player and event or method.
 *
 * @param {Player} player The player object.
 * @param {string} name The method or event name
 * @return {function[]}
 */
export function getCallbacks(player, name) {
  const playerCallbacks = callbackMap.get(player.element) || {}
  return playerCallbacks[name] || []
}
