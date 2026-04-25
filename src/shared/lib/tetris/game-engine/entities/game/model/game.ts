import { Tetris } from '@@/lib/tetris/tetris-engine/entities/tetris/model/tetris.ts'
import { getDocTime } from '@@/utils/dom/getDocTime.ts'
import { setOf } from '@@/utils/js/factory.ts'
import { incIntOrZero } from '@@/utils/js/mutations.ts'
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
  gameOver = false
  animation: GameAnimation | undefined
  lastActionAt = 0 // document time ms
  allowActionsDuringAnimation = false
  pausedAt: number | undefined = 0 // document time ms
  rafPaused = true
  userActionsCnt = 0
  
  nextAnimation(animation: GameAnimation | undefined) {
    this.allowActionsDuringAnimation = false
    this.animation = animation
  }
  isPause(): this is { get pausedAt(): number; set pausedAt(pausedAt: number | undefined) } {
    return isdef(this.pausedAt)
  }
  get isPlaying() { return !this.isPause() && !this.gameOver }
  
  get allowUserAction() {
    return !this.isPause() && this.allowActionsDuringAnimation && !this.gameOver
  }
  incUserActionsCnt() { this.userActionsCnt = incIntOrZero(this.userActionsCnt) }
  
  setTime(time: number) { this.lastActionAt = time }
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
    if (this.isPause() && !this.gameOver) {
      const pausedFor = getDocTime() - this.pausedAt
      this.lastActionAt += pausedFor
      this.pausedAt = undefined
      if (this.rafPaused) {
        this.rafPaused = false
        requestAnimationFrame(this.run(this.userActionsCnt))
      }
    }
  }
  pause() { this.pausedAt = getDocTime() }
  
  
  
  // Lifecycle methods
  run = (prevUserActionsCnt: number) => (docTime: number) => {
    if (!this.isPlaying) { this.rafPaused = true; return }
    
    if (!this.animation) this.nextAnimation(this.fallAnimation(docTime))
    
    let changed = this.userActionsCnt !== prevUserActionsCnt
    let done = true
    while (this.animation && done) {
      const result = this.animation.next(docTime)
      done = !!result.done
      changed ||= result.value.changed
      const next = result.value.next
      if (done) this.nextAnimation(next)
    }
    if (changed) this.notifyChange()
    
    /* if (!this.animation) {
      if (this.state === 'lockDelay') {
        const locked = docTime - this.lastActionAt >= this.lockDelay
        if (locked) {
          this.lastActionAt = docTime
          this.goNextPiece()
        }
      }
    } */
    
    requestAnimationFrame(this.run(this.userActionsCnt))
  }
  /*
  syncState(moved = false) {
    const { state, tetris } = this
    if (!this.animation) {
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
   */
  
  
  // Engine animations
  
  // eslint-disable-next-line require-yield
  /* ;*fallAction0(docTime: number): GameAnimation {
    const { fallInterval } = this
    const fallDepth = Math.floor(this.elapsed(docTime) / fallInterval)
    this.advance(fallDepth * fallInterval)
    const fallen = this.tetris.fallBy(fallDepth)
    if (!this.tetris.canMoveDown()) this.goLockDelay()
    return { changed: !!fallen }
  } */
  
  ;*fallAnimation(docTime: number): GameAnimation {
    this.allowActionsDuringAnimation = true
    let changed = false
    do {
      const { fallInterval } = this
      
      const fallDepth = Math.floor(this.elapsed(docTime) / fallInterval)
      this.advance(fallDepth * fallInterval)
      
      const fallen = this.tetris.fallBy(fallDepth)
      changed = !!fallen
      
      const canFall = this.tetris.canMoveDown()
      if (!canFall) return { changed, next: this.lockDelayAnimation(docTime) }
      
      docTime = yield { changed }; changed = false
    } while (true)
  }
  ;*lockDelayAnimation(docTime: number): GameAnimation {
    this.allowActionsDuringAnimation = true
    do {
      const { lockDelay } = this
      
      const fallen = this.tetris.moveDown()
      if (fallen) {
        this.setTime(docTime)
        return { changed: true, next: this.fallAnimation(docTime) }
      }
      
      const locked = this.elapsed(docTime) >= lockDelay
      if (locked) {
        this.tetris.lockCurrentPiece()
        this.setTime(docTime)
        return { changed: false, next: this.clearLinesAnimation(docTime) }
      }
      
      docTime = yield { changed: false }
    } while (true)
  }
  ;*dropAnimation(): GameAnimation {
    let docTime = getDocTime()
    this.setTime(docTime)
    let changed = false
    do {
      const { dropInterval, scoresForDroppedBlock } = this
      const fallDepth = Math.floor(this.elapsed(docTime) / dropInterval)
      this.advance(fallDepth * dropInterval)
      const fallen = this.tetris.fallBy(fallDepth)
      this.addScore(fallen * scoresForDroppedBlock)
      changed = !!fallen
      if (!this.tetris.canMoveDown()) {
        this.tetris.lockCurrentPiece()
        return { changed, next: this.clearLinesAnimation(docTime) }
      }
      docTime = yield { changed }; changed = false
    } while (true)
  }
  ;*clearLinesAnimation(docTime: number): GameAnimation {
    const lines = this.tetris.getFullLines()
    if (!lines.length) return { changed: false, next: this.spawnNextPieceAnimation() }
    let changed = false
    do {
      if (this.tick(this.clearLinesDelay, docTime)) {
        this.tetris.clearLines(lines)
        changed = !!lines.length
        break
      }
      docTime = yield { changed }; changed = false
    } while (true)
    do {
      if (this.tick(this.removeLinesDelay, docTime)) {
        this.tetris.removeLines(lines)
        return { changed: !!lines.length, next: this.spawnNextPieceAnimation() }
      }
      docTime = yield { changed }; changed = false
    } while (true)
  }
  // eslint-disable-next-line require-yield
  ;*spawnNextPieceAnimation(): GameAnimation {
    const spawned = this.tetris.spawnNextPiece()
    if (!spawned) {
      this.gameOver = true
      return { changed: false }
    }
    return { changed: true }
  }
  
  
  
  processUserAction(moved: boolean) {
    if (moved) {
      this.incUserActionsCnt()
    }
  }
  
  
  // User actions
  moveLeft() {
    if (!this.allowUserAction) return
    const moved = this.tetris.moveLeft()
    this.processUserAction(moved)
  }
  moveRight() {
    if (!this.allowUserAction) return
    const moved = this.tetris.moveRight()
    this.processUserAction(moved)
  }
  moveDown() {
    if (!this.allowUserAction) return
    const moved = this.tetris.moveDown()
    this.processUserAction(moved)
  }
  moveUp() {
    if (!this.allowUserAction) return
    const moved = this.tetris.moveUp()
    this.processUserAction(moved)
  }
  rotateLeft() {
    if (!this.allowUserAction) return
    const moved = this.tetris.rotateLeft()
    this.processUserAction(moved)
  }
  rotateRight() {
    if (!this.allowUserAction) return
    const moved = this.tetris.rotateRight()
    this.processUserAction(moved)
  }
  hardDrop() {
    if (!this.allowUserAction) return
    this.nextAnimation(this.dropAnimation())
  }
  
}



export type GameActionResult = { changed: boolean, next?: GameAnimation | undefined }
export type GameAnimation = IterableIterator<
  GameActionResult, // Is changed
  GameActionResult, // Is changed & next action
  number // Get current document time
> | undefined
