import type {
  NativeGamepadId,
  NativeGamepadMeta,
} from '@lib/gamepad-input/native/model/nativeGamepad.model.ts'



export type MappedGamepadSignalId = string
// number for analog value, boolean for push value
export type MappedGamepadSignalValue = number | boolean
export type MappedGamepadState = Record<MappedGamepadSignalId, MappedGamepadSignalValue>

export interface MappedGamepad {
  id: NativeGamepadId
  meta: NativeGamepadMeta
  state: MappedGamepadState
}



export interface NativeToNormalizedSignalMapping {
  push?: number | undefined
  pushOff?: number | undefined
  pushFrom?: number | undefined
  pushTo?: number | undefined
  pushOffFrom?: number | undefined
  pushOffTo?: number | undefined
  pushUndef?: boolean | undefined
  // analogFrom?: number | undefined
  // analogTo?: number | undefined
  // analogBaseFrom?: number | undefined
  // analogBaseTo?: number | undefined
}

export type NormalizedSignal = number | boolean | undefined




export type MappedGamepadEv = MappedGamepadGotStateEv

export interface MappedGamepadGotStateEv {
  type: 'mappedGamepadGotState'
  ts: number
}
