import type { Xy } from '@@/utils/math/rect.ts'
import type { Consumer } from '@@/utils/ts/ts.ts'
import React from 'react'
import { useRefGetSet } from '@@/utils/react/state/useRefGetSet.ts'



export function usePointer<A extends any[]>(onDrag: OnDrag<A>) {
  
  type Args = any[]
  type PointerId = number
  type Moves = Record<string, MoveData | undefined>
  
  // TODO сохранять для каждого инстанса листенеров свои данные
  const [getMoves] = useRefGetSet<Moves>({ })
  
  const getMove = (pointerId: PointerId) => getMoves()[pointerId]
  const setMove = (pointerId: PointerId, move?: MoveData) => {
    if (!move) delete getMoves()[pointerId]
    else getMoves()[pointerId] = move
  }
  
  // Performs shallow update of current move object with props that exists in update.
  // If your move does not start from 'down' then you can update { wasStarted: true }.
  // Changes are saved across events (if event does not write particular prop with its data).
  // You have different move object references on each event.
  const updateMove = (pointerId: PointerId, update: MoveUpdate) => {
    const move = getMove(pointerId)
    if (move) Object.assign(move, update)
  }
  
  return (...args: A) => {
    
    const onPointerDown = (ev: React.PointerEvent) => {
      const { pointerId, clientX: vpx, clientY: vpy } = ev
      const curr: MoveData = {
        ev,
        evType: 'down',
        pointerId,
        
        start: true,
        wasStart: true,
        
        first: true,
        last: false,
        
        vp0: { x: vpx, y: vpy },
        vp: { x: vpx, y: vpy },
        move: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
      }
      setMove(pointerId, curr)
      const updateThisMove = (update: MoveUpdate) => updateMove(pointerId, update)
      onDrag(curr, updateThisMove, ...args)
    }
    
    const onPointerMove = (ev: React.PointerEvent) => {
      const { pointerId, clientX: vpx, clientY: vpy } = ev
      const prev = getMove(pointerId)
      const curr: MoveData = {
        ev,
        evType: 'move',
        pointerId,
        
        start: false,
        wasStart: prev?.wasStart ?? false,
        
        first: false,
        last: false,
        
        vp0: prev?.vp0 ?? { x: vpx, y: vpy },
        vp: { x: vpx, y: vpy },
        move: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
      }
      if (!prev) curr.first = true
      curr.move = { x: curr.vp.x - curr.vp0.x, y: curr.vp.y - curr.vp0.y }
      if (prev) curr.delta = { x: curr.vp.x - prev.vp0.x, y: curr.vp.y - prev.vp0.y }
      setMove(pointerId, curr)
      const updateThisMove = (update: MoveUpdate) => updateMove(pointerId, update)
      onDrag(curr, updateThisMove, ...args)
    }
    
    const onPointerUp = (ev: React.PointerEvent) => {
      const { pointerId, clientX: vpx, clientY: vpy } = ev
      const prev = getMove(pointerId)
      const curr: MoveData = {
        ev,
        evType: 'up',
        pointerId,
        
        start: false,
        wasStart: prev?.wasStart ?? false,
        
        first: false,
        last: true,
        
        vp0: prev?.vp0 ?? { x: vpx, y: vpy },
        vp: { x: vpx, y: vpy },
        move: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
      }
      if (!prev) curr.first = true
      curr.move = { x: curr.vp.x - curr.vp0.x, y: curr.vp.y - curr.vp0.y }
      if (prev) curr.delta = { x: curr.vp.x - prev.vp0.x, y: curr.vp.y - prev.vp0.y }
      setMove(pointerId, undefined)
      const updateThisMove = (update: MoveUpdate) => updateMove(pointerId, update)
      onDrag(curr, updateThisMove, ...args)
    }
    
    const onPointerCancel = (ev: React.PointerEvent) => {
      const { pointerId, clientX: vpx, clientY: vpy } = ev
      const prev = getMove(pointerId)
      const curr: MoveData = {
        ev,
        evType: 'cancel',
        pointerId,
        
        start: false,
        wasStart: prev?.wasStart ?? false,
        
        first: false,
        last: true,
        
        vp0: prev?.vp0 ?? { x: vpx, y: vpy },
        vp: { x: vpx, y: vpy },
        move: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
      }
      if (!prev) curr.first = true
      curr.move = { x: curr.vp.x - curr.vp0.x, y: curr.vp.y - curr.vp0.y }
      if (prev) curr.delta = { x: curr.vp.x - prev.vp0.x, y: curr.vp.y - prev.vp0.y }
      setMove(pointerId, undefined)
      const updateThisMove = (update: MoveUpdate) => updateMove(pointerId, update)
      onDrag(curr, updateThisMove, ...args)
    }
    
    const onLostPointerCapture = (ev: React.PointerEvent) => {
      const { pointerId, clientX: vpx, clientY: vpy } = ev
      const prev = getMove(pointerId)
      const curr: MoveData = {
        ev,
        evType: 'lostCapture',
        pointerId,
        
        start: false,
        wasStart: prev?.wasStart ?? false,
        
        first: false,
        last: true,
        
        vp0: prev?.vp0 ?? { x: vpx, y: vpy },
        vp: { x: vpx, y: vpy },
        move: { x: 0, y: 0 },
        delta: { x: 0, y: 0 },
      }
      if (!prev) curr.first = true
      curr.move = { x: curr.vp.x - curr.vp0.x, y: curr.vp.y - curr.vp0.y }
      if (prev) curr.delta = { x: curr.vp.x - prev.vp0.x, y: curr.vp.y - prev.vp0.y }
      setMove(pointerId, undefined)
      const updateThisMove = (update: MoveUpdate) => updateMove(pointerId, update)
      onDrag(curr, updateThisMove, ...args)
    }
    
    return {
      onPointerDown, // stable
      onPointerMove, // stable
      onPointerUp, // stable
      onPointerCancel, // stable
      onLostPointerCapture, // stable
    }
  }
}



export type MoveData = {
  ev: React.PointerEvent
  evType: 'down' | 'move' | 'up' | 'cancel' | 'lostCapture'
  pointerId: number
  
  start: boolean
  wasStart: boolean
  
  first: boolean
  last: boolean
  
  // Start of drag coords relative viewport
  vp0: Xy
  // Current coords relative viewport
  vp: Xy
  // Distance from start point to current point
  move: Xy
  // Distance from previous point to current point
  delta: Xy
}

export type MoveUpdate = Partial<MoveData>

export type UpdateMove = Consumer<MoveUpdate>
export type OnDrag<A extends any[]> = (move: MoveData, update: UpdateMove, ...args: A) => void