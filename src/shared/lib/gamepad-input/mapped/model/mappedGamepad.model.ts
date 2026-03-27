import type {
  NativeGamepadId,
  NativeGamepadMeta, NativeGamepadState,
} from '@lib/gamepad-input/native/model/nativeGamepad.model.ts'
import { type num2, rangeHas, rangeMapClamp } from '@utils/math/range.ts'
import { rf5 } from '@utils/math/rounding.ts'
import { isbool, isdef, isnumber } from '@utils/ts/ts.ts'



export type MappedGamepadSignalId = string

export type MappedPushSignal = boolean
export type MappedAnalogSignal = number
export type MappedGamepadSignal = MappedPushSignal | MappedAnalogSignal | undefined
export type MappedGamepadState = Record<MappedGamepadSignalId, MappedGamepadSignal>

export interface MappedGamepad {
  id: NativeGamepadId
  meta: NativeGamepadMeta
  state: MappedGamepadState
}



export interface SignalMapping {
  signalId: string
  
  push?: number | undefined
  pushOff?: number | undefined
  
  pushFrom?: number | undefined
  pushTo?: number | undefined
  pushOffFrom?: number | undefined
  pushOffTo?: number | undefined
  
  analog?: num2 | undefined
  analogIn?: num2 | undefined
  analogElse?: number | undefined
}

export interface SignalOperatorMapping {
  operator: 'and' | 'or' | 'not' | 'max' | 'min' | 'avg'
  signals: SignalExpressionMapping[]
}

export type SignalExpressionMapping = SignalMapping | SignalOperatorMapping

export type GamepadMapping = Record<string, SignalExpressionMapping>



export function nativeGamepadStateToMappedState(
  nativeState: NativeGamepadState,
  mapping: GamepadMapping,
  prevMapped?: MappedGamepadState,
): MappedGamepadState {
  return Object.fromEntries(Object.entries(mapping).map(([mSigId, m]) => {
    return [mSigId, getMappedSignal(nativeState, m, prevMapped?.[mSigId])]
  }))
}

export function getMappedSignal(
  nativeState: NativeGamepadState,
  signalExprMapping: SignalExpressionMapping,
  prevSignal?: MappedGamepadSignal,
): MappedGamepadSignal {
  let mSig: MappedGamepadSignal = undefined
  const sExpr = signalExprMapping
  if ('signalId' in sExpr) {
    const {
      signalId,
      push, pushOff,
      pushFrom, pushTo, pushOffFrom, pushOffTo,
      analog, analogIn, analogElse,
    } = sExpr
    const isPush = isdef(push)
    const isPushOff = isdef(pushOff)
    const isPushFrom = isdef(pushFrom)
    const isPushTo = isdef(pushTo)
    const isPushOffFrom = isdef(pushOffFrom)
    const isPushOffTo = isdef(pushOffTo)
    const isAnalog = isdef(analog)
    const isAnalogIn = isdef(analogIn)
    const isAnalogElse = isdef(analogElse)
    
    let ns = nativeState[signalId]
    
    if (isdef(ns)) {
      ns = rf5(ns)
      if (isAnalog || isAnalogIn || isAnalogElse) {
        const a: MappedAnalogSignal = (() => {
          if (isAnalog) {
            if (rangeHas(ns, analogIn ?? analog)) {
              return rangeMapClamp(ns, analog, [0, 1])
            }
          }
          if (isAnalogElse) return analogElse
          return 0
        })()
        return a
      }
      
      if (isPush || isPushOff || isPushFrom || isPushTo || isPushOffFrom || isPushOffTo) {
        const p: MappedPushSignal = (() => {
          const anyPushProp = isPush || isPushFrom || isPushTo
          const anyPushOffProp = isPushOff || isPushOffFrom || isPushOffTo
          const anyPush = (() => {
            if (isPush) { if (ns === push) return true }
            if (isPushFrom || isPushTo) {
              if (isPushFrom && isPushTo) {
                if (rangeHas(ns, [pushFrom, pushTo])) return true
              }
              else if (isPushFrom) { if (ns >= pushFrom) return true }
              else if (isPushTo) { if (ns <= pushTo) return true }
            }
          })()
          const anyPushOff = (() => {
            if (isPushOff) { if (ns === pushOff) return true }
            if (isPushOffFrom || isPushOffTo) {
              if (isPushOffFrom && isPushOffTo) {
                if (rangeHas(ns, [pushOffFrom, pushOffTo])) return true
              }
              else if (isPushOffFrom) { if (ns >= pushOffFrom) return true }
              else if (isPushOffTo) { if (ns <= pushOffTo) return true }
            }
          })()
          if (anyPush) return true
          if (anyPushOff) return false
          if (anyPushProp && !anyPushOffProp) return false
          if (!anyPushProp && anyPushOffProp) return true
          if (anyPushProp && anyPushOffProp && isbool(prevSignal)) return prevSignal
          return false
        })()
        return p
      }
    }
    
    return undefined
  }
  else if ('signals' in sExpr) {
    const signals = sExpr.signals.map(it => getMappedSignal(nativeState, it, prevSignal))
    const op = sExpr.operator
    if (op === 'and') {
      mSig = signals.filter(it => isbool(it)).reduce((a, c) => a && c, undefined)
    }
    else if (op === 'or') {
      //@ts-expect-error
      mSig = signals.filter(it => isbool(it)).reduce((a, c) => a || c, undefined)
    }
    else if (op === 'not') {
      if (isbool(signals[0])) mSig = !signals[0]
    }
    else if (op === 'max') {
      //@ts-expect-error
      mSig = signals.filter(it => isnumber(it)).reduce((a, c) => Math.max(a, c), undefined)
    }
    else if (op === 'min') {
      //@ts-expect-error
      mSig = signals.filter(it => isnumber(it)).reduce((a, c) => Math.min(a, c), undefined)
    }
    else if (op === 'avg') {
      let cnt = 1
      mSig = signals.filter(it => isnumber(it))
        //@ts-expect-error
        .reduce((a, c) => cnt / (cnt + 1) * a + c / ++cnt, undefined)
    }
  }
  
  return mSig
}




export type MappedGamepadEv = MappedGamepadGotStateEv

export interface MappedGamepadGotStateEv {
  type: 'mappedGamepadGotState'
  ts: number
}
