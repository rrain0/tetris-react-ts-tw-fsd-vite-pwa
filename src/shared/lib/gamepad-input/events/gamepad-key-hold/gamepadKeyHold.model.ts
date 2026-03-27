


export interface GamepadKeyHoldEv {
  type: 'gamepadKeyHold'
  ts: number
  gpId: string
  signalId: string
  keyId: string
}

export type GamepadKeyHoldEvHandler = (ev: GamepadKeyHoldEv) => void