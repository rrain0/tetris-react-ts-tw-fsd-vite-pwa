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
  pushOnFrom?: number | undefined
  pushOnTo?: number | undefined
  pushOffFrom?: number | undefined
  pushOffTo?: number | undefined
  
  analogFrom?: number | undefined
  analogTo?: number | undefined
  //analogBase???
  //analogOff??
}




export type MappedGamepadEv = MappedGamepadGotStateEv

export interface MappedGamepadGotStateEv {
  type: 'mappedGamepadGotState'
  ts: number
}
