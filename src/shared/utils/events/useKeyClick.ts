import { useRefGetSet } from '@utils/react/state/useRefGetSet.ts'
import React from 'react'



export function useKeyClick<T = HTMLDivElement>(
  onKeyClick?: React.KeyboardEventHandler<T>,
) {
  const [getState] = useRefGetSet(new Set<JsonCodeKey>())
  
  
  const startKey = (ev: KbEv) => {
    getState().add(evToJsonCodeKey(ev))
  }
  const checkKey = (ev: KbEv) => {
    return getState().has(evToJsonCodeKey(ev))
  }
  const endKey = (ev: KbEv) => {
    getState().delete(evToJsonCodeKey(ev))
  }
  const endAllKeys = () => {
    getState().clear()
  }
  
  
  // Сохраняем нажатую кнопку
  // Эвенты от зажатия не считаются
  const onKeyDown: React.KeyboardEventHandler<T> = ev => {
    if (ev.repeat) return
    startKey(ev)
  }
  // Проверяем есть ли такая же сохранённая кнопка, вызываем keyClick эвент,
  // удаляем сохранённую кнопку
  const onKeyUp: React.KeyboardEventHandler<T> = ev => {
    if (!checkKey(ev)) return
    onKeyClick?.(ev)
    endKey(ev)
  }
  // Делает элемент фокусируемым (но не через Tab)
  const tabIndex = -1
  // При потере фокуса из дерева элемента, удаляем все сохранённые кнопки
  const onBlur = () => {
    endAllKeys()
  }
  
  
  return { onKeyDown, onKeyUp, tabIndex, onBlur }
}


type JsonCodeKey = string
type KbEv = KeyboardEvent | React.KeyboardEvent<any>


function evToJsonCodeKey(ev: KbEv) {
  const { code, key } = ev
  const jsonCodeKey = JSON.stringify({ code, key })
  return jsonCodeKey
}
