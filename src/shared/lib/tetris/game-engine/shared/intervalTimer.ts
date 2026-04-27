import { isundef } from '@@/utils/ts/ts.ts'



export class IntervalTimer {
  startAt: number
  intervals: IntervalData[]
  intervalsI: count = 0
  intervalI: count = 0
  dTime: number = 0
  
  private constructor() { }
  static of(startAt: number, delays: IntervalData[]) {
    const it = new IntervalTimer()
    it.startAt = startAt
    it.intervals = delays
    return it
  }
  
  advanceTo(to: number) {
    to = Math.max(to, this.startAt + this.dTime)
    let advanceCnt = 0, advanceTime = 0
    while (true) {
      const { startAt, intervals, intervalsI, intervalI, dTime } = this
      const { interval, cnt } = intervals[intervalsI]
      
      const time = startAt + dTime
      const infiniteIntervals = isundef(cnt)
      
      const cntUpTo = interval ? Math.floor((to - time) / interval) : to - time
      
      const cntUpCnt = !infiniteIntervals ? cnt - intervalI : cntUpTo
      
      const goNextIntervals = !infiniteIntervals && cntUpTo >= cntUpCnt
      
      const cntUp = Math.min(cntUpTo, cntUpCnt)
      const dTimeUp = interval * cntUp
      
      advanceCnt += cntUp
      advanceTime += dTimeUp
      
      this.dTime += dTimeUp
      
      if (goNextIntervals) {
        this.intervalsI++
        this.intervalI = 0
      }
      else {
        this.intervalI += cntUp
        break
      }
    }
    return {
      advanceCnt, advanceTime,
      time: this.startAt + this.dTime,
    }
  }
}



export type IntervalData = { interval: number, cnt?: count | undefined }
