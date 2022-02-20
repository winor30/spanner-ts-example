import { performance } from 'perf_hooks';

export class TimeMeasure {
  private _start: number = 0;
  private _end: number = 0;
  constructor() {
    this._start = performance.now();
  }

  public end() {
    this._end = performance.now();
    console.log(`${this._end - this._start} ms`);
  }
}
