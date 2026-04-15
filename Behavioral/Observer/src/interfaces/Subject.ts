// Observer Pattern — Subject interface
// Defines the subscription management and notification contract that Log implements.

import { Observer } from "./Observer";

/**
 * Subject interface in the Observer pattern.
 * Log (ConcreteSubject) implements this to maintain its observer list and broadcast
 * state changes, keeping it decoupled from the concrete Observer types.
 */
export interface Subject {
  /** Subscribes an observer to receive future notifications. */
  add(observer: Observer): void;
  /** Removes an observer so it no longer receives notifications. */
  remove(observer: Observer): void;
  /** Notifies all subscribed observers that the subject's state has changed. */
  notify(): void;
}
