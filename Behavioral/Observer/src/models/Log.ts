import { Subject } from "../interfaces/Subject";
import { Observer } from "../interfaces/Observer";

export class Log implements Subject {
  ObserverList: Observer[] = [];
  uniqueTimes: string[] = [];
  logList: string[] = [];

  add(observer: Observer) {
    this.ObserverList.push(observer);
  }

  remove(observer: Observer) {
    this.ObserverList = this.ObserverList.filter((val) => val !== observer);
  }

  notify() {
    for (const observer of this.ObserverList) {
      observer.update();
    }
  }

  setTime(time: string) {
    this.uniqueTimes.push(time);
  }

  getTime() {
    return this.uniqueTimes;
  }

  getState(): string[] {
    return this.logList;
  }

  setState(logState: string) {
    this.logList.push(logState);
    this.notify();
  }
}
