


export interface GamepadInfo {
  id: string
  i: number
  buttonsCnt: number
  axesCnt: number
  mapping: string
}

export type GamepadId = string
export interface GamepadState {
  gpId: GamepadId
  gp: GamepadInfo
  buttons: number[]
  axes: number[]
}

export function gamepadToState(gp: Gamepad): GamepadState {
  const { id, index: i, buttons: { length: buttonsCnt }, axes: { length: axesCnt }, mapping } = gp
  return {
    gpId: gamepadToId(gp),
    gp: { id, i, buttonsCnt, axesCnt, mapping },
    buttons: gp.buttons.map(it => it.value),
    axes: [...gp.axes],
  }
}
export function gamepadToId(gp: Gamepad): GamepadId {
  const { id, index: i, buttons: { length: buttonsCnt }, axes: { length: axesCnt }, mapping } = gp
  return JSON.stringify({ id, i, buttonsCnt, axesCnt, mapping })
}




export type GamepadEv =
  | GamepadConnectedEv
  | GamepadDisconnectedEv
  | GamepadTickEv

export interface GamepadConnectedEv {
  type: 'gamepadConnected'
  ts: number
  gpId: GamepadId
}
export interface GamepadDisconnectedEv {
  type: 'gamepadDisconnected'
  ts: number
  gpId: GamepadId
}
export interface GamepadTickEv {
  type: 'gamepadTick'
  ts: number
}
