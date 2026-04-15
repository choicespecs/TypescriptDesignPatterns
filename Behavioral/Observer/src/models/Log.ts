// Observer Pattern — ConcreteSubject
// Maintains the log entries and the list of observers that watch for new entries.

import { Subject } from "../interfaces/Subject";
import { Observer } from "../interfaces/Observer";

/**
 * ConcreteSubject in the Observer pattern.
 * Log holds the activity log state and manages a list of User observers.
 * When setState() adds a new log entry, it calls notify() to push the update
 * to every subscribed observer.
 */
export class Log implements Subject {
  ObserverList: Observer[] = [];
  uniqueTimes: string[] = [];
  logList: string[] = [];

  add(observer: Observer) {
    this.ObserverList.push(observer); // Subscribe a new observer
  }

  remove(observer: Observer) {
    this.ObserverList = this.ObserverList.filter((val) => val !== observer);
  }

  /** Calls update() on every subscribed observer (push model). */
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

  /** Allows observers to pull the latest log entry after being notified. */
  getState(): string[] {
    return this.logList;
  }

  /** Changes the subject's state and immediately broadcasts the change to all observers. */
  setState(logState: string) {
    this.logList.push(logState);
    this.notify(); // State changed — notify all subscribers
  }
}
