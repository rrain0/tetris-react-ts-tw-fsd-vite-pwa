


export interface GamepadInfo {
  id: string
  i: number
  buttonsCnt: number
  axesCnt: number
  mapping: string
}

export interface GamepadState {
  gpId: string
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
export function gamepadToId(gp: Gamepad): string {
  const { id, index: i, buttons: { length: buttonsCnt }, axes: { length: axesCnt }, mapping } = gp
  return JSON.stringify({ id, i, buttonsCnt, axesCnt, mapping })
}



export interface GamepadInputEv {
  ts: number
  gpId: string
  gp: GamepadInfo
  button?: boolean | undefined
  buttonI?: number | undefined
  buttonValue?: number | undefined
  axis?: boolean | undefined
  axisI?: number | undefined
  axisValue?: number | undefined
  disconnected?: boolean | undefined
}
