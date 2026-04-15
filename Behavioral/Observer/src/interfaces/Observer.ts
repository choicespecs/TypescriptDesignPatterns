// Observer Pattern — Observer interface
// Any object that wants to be notified of Log state changes must implement this.

/**
 * Observer interface in the Observer pattern.
 * User (ConcreteObserver) implements update() so it is called by Log (Subject)
 * whenever the log state changes, without the Subject knowing the Observer's type.
 */
export interface Observer {
  /** Called by the Subject whenever its state changes; observers pull the new state themselves. */
  update(): void;
}
