// Observer Pattern — ConcreteObserver
// Listens for Log notifications and renders the latest entry into its own DOM section.

import { Observer } from "../interfaces/Observer";
import { Log } from "./Log";

/**
 * ConcreteObserver in the Observer pattern.
 * Each User is subscribed to a Log (Subject). When the log changes, the Subject
 * calls update(), and the User pulls the latest entry from the log and displays it.
 */
export class User implements Observer {
  constructor(private log: Log, private user: string) {}

  /** Called by Log.notify(); reads the newest log entry and appends it to this user's DOM list. */
  update() {
    const logList = this.log.getState(); // Pull the latest state from the Subject
    const userLog = document.querySelector(`.user-log-news.${this.user}`);
    if (userLog) {
      const li = document.createElement("li");
      const updatedLog = logList.slice(-1)[0]; // Most recent entry
      li.appendChild(document.createTextNode(updatedLog));
      userLog.appendChild(li);
    }
  }
}
