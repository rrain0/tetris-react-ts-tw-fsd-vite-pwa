import { Tetris } from '@@/lib/tetris/tetris-engine/entities/tetris/model/tetris.ts'
import { getDocTime } from '@@/utils/dom/getDocTime.ts'
import { setOf } from '@@/utils/js/factory.ts'
import { type Cb, isdef } from '@@/utils/ts/ts.ts'



export class Game {
  
  // Config - gameplay
  startLevel = 1
  linesToLvlUp = 10
  fallIntervalForLvl1 = 1000
  lockDelayLvl1 = 500
  lockDelayMovesLeft = 15
  
  get fallInterval() { return this.fallIntervalForLvl1 }
  get lockDelay() { return this.lockDelayLvl1 }
  
  
  
  // Config - animations
  dropIntervalForLvl1 = 10
  clearLinesDelay = 200
  removeLinesDelay = 400
  
  get dropInterval() { return this.dropIntervalForLvl1 }
  
  
  
  // Config - scores
  scoresForDroppedBlock = 2
  
  
  
  // Progress
  hiScore = 0
  lines = 0
  score = 0
  level = this.startLevel
  tetris: Tetris = new Tetris()
  
  addScore(score: number) {
    this.score += score
    this.hiScore = Math.max(this.hiScore, this.score)
  }
  
  
  
  // Listeners
  listeners: Set<Cb> = setOf()
  onChange(listener: Cb) { this.listeners.add(listener) }
  offChange(listener: Cb) { this.listeners.delete(listener) }
  notifyChange() { for (const l of this.listeners) l() }
  
  
  
  // Running state & actions
  state: 'lockDelay' | 'gameOver' | undefined
  action: GameAction | undefined
  lastActionAt = 0 // document time ms
  pausedAt: number | undefined = 0 // document time ms
  rafPaused = true
  currLockDelayLeftMoves = this.lockDelayMovesLeft
  
  isPause(): this is { get pausedAt(): number; set pausedAt(pausedAt: number | undefined) } {
    return isdef(this.pausedAt)
  }
  get isPlaying() { return !this.isPause() && this.state !== 'gameOver' }
  
  get canMove() {
    const { state, action } = this
    return !this.isPause() && !action && state !== 'gameOver'
  }
  
  elapsed(to: number) { return to - this.lastActionAt }
  advance(time: number) { this.lastActionAt += time }
  tick(delay: number, now: number): boolean {
    if (this.lastActionAt + delay <= now) {
      this.advance(delay)
      return true
    }
    return false
  }
  
  resume() {
    if (this.isPause()) {
      const pausedFor = getDocTime() - this.pausedAt
      this.lastActionAt += pausedFor
      this.pausedAt = undefined
      if (this.rafPaused) {
        this.rafPaused = false
        requestAnimationFrame(this.run)
      }
    }
  }
  pause() { this.pausedAt = getDocTime() }
  
  
  
  // Lifecycle methods
  run = (docTime: number) => {
    if (!this.isPlaying) { this.rafPaused = true; return }
    
    //while (this.lastActionAt < docTime || this.state !== 'gameOver') { }
    
    if (!this.state && !this.action) this.action = this.fallAction(docTime)
    let changed = false, done = true
    while (this.action && done) {
      const result = this.action.next(docTime)
      done = !!result.done
      changed ||= result.value.changed
      const next = result.value.next
      if (done) this.action = next
    }
    if (changed) this.notifyChange()
    
    if (!this.action) {
      if (this.state === 'lockDelay') {
        const locked = docTime - this.lastActionAt >= this.lockDelay
        if (locked) {
          this.lastActionAt = docTime
          this.goNextPiece()
        }
      }
    }
    
    requestAnimationFrame(this.run)
  }
  syncState(moved = false) {
    const { state, tetris } = this
    if (!this.action) {
      if (state === 'lockDelay') {
        if (moved) this.lastActionAt = getDocTime()
        const fallen = tetris.moveDown()
        if (fallen) { this.goFall(); return }
        else {
          if (moved) this.currLockDelayLeftMoves--
          if (this.currLockDelayLeftMoves <= 0) { this.goNextPiece(); return }
        }
      }
      this.notifyChange()
    }
  }
  
  goLockDelay() {
    this.state = 'lockDelay'
    this.notifyChange()
  }
  goFall() {
    this.state = undefined
    this.currLockDelayLeftMoves = this.lockDelayMovesLeft
    this.syncState()
  }
  goNextPiece() {
    this.tetris.lockCurrentPiece()
    const lines = this.tetris.getFullLines()
    this.tetris.clearLines(lines)
    this.tetris.removeLines(lines)
    const spawned = this.tetris.spawnNextPiece()
    if (!spawned) { this.state = 'gameOver'; return }
    this.goFall()
  }
  
  
  
  // Engine actions
  // eslint-disable-next-line require-yield
  ;*fallAction(docTime: number): GameAction {
    const { fallInterval } = this
    const fallDepth = Math.floor(this.elapsed(docTime) / fallInterval)
    this.advance(fallDepth * fallInterval)
    const fallen = this.tetris.fallBy(fallDepth)
    if (!this.tetris.canMoveDown()) this.goLockDelay()
    return { changed: !!fallen }
  }
  ;*dropAction(): GameAction {
    let changed = false
    while (true) {
      const docTime = yield { changed }
      const { dropInterval, scoresForDroppedBlock } = this
      const fallDepth = Math.floor(this.elapsed(docTime) / dropInterval)
      this.advance(fallDepth * dropInterval)
      const fallen = this.tetris.fallBy(fallDepth)
      changed = !!fallen
      this.addScore(fallen * scoresForDroppedBlock)
      if (!this.tetris.canMoveDown()) {
        this.tetris.lockCurrentPiece()
        return { changed, next: this.clearLinesAction() }
      }
    }
  }
  ;*clearLinesAction(): GameAction {
    const lines = this.tetris.getFullLines()
    if (!lines.length) return { changed: false, next: this.spawnNextPieceAction() }
    let changed = false
    while (true) {
      const docTime = yield { changed }
      changed = false
      if (this.tick(this.clearLinesDelay, docTime)) {
        this.tetris.clearLines(lines)
        changed = !!lines.length
        break
      }
    }
    while (true) {
      const docTime = yield { changed }
      changed = false
      if (this.tick(this.removeLinesDelay, docTime)) {
        this.tetris.removeLines(lines)
        return { changed: !!lines.length, next: this.spawnNextPieceAction() }
      }
    }
  }
  // eslint-disable-next-line require-yield
  ;*spawnNextPieceAction(): GameAction {
    const spawned = this.tetris.spawnNextPiece()
    if (!spawned) { this.state = 'gameOver'; return { changed: true } }
    this.goFall()
    return { changed: true }
  }
  
  
  
  // User actions
  moveLeft() {
    if (!this.canMove) return
    const moved = this.tetris.moveLeft()
    if (moved) this.syncState(true)
  }
  moveRight() {
    if (!this.canMove) return
    const moved = this.tetris.moveRight()
    if (moved) this.syncState(true)
  }
  moveDown() {
    if (!this.canMove) return
    const moved = this.tetris.moveDown()
    if (moved) this.syncState(true)
  }
  moveUp() {
    if (!this.canMove) return
    const moved = this.tetris.moveUp()
    if (moved) this.syncState(true)
  }
  rotateLeft() {
    if (!this.canMove) return
    const moved = this.tetris.rotateLeft()
    if (moved) this.syncState(true)
  }
  rotateRight() {
    if (!this.canMove) return
    const moved = this.tetris.rotateRight()
    if (moved) this.syncState(true)
  }
  hardDrop() {
    if (!this.canMove) return
    this.lastActionAt = getDocTime()
    this.action = this.dropAction()
  }
  
}



export type GameActionResult = { changed: boolean, next?: GameAction | undefined }
export type GameAction = IterableIterator<
  GameActionResult, // Is changed
  GameActionResult, // Is changed & next action
  number // Get current document time
> | undefined
