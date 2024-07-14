import { Observer } from "./Observer";
import { Log } from "./Log";

export class User implements Observer {
  constructor(private log: Log, private user: string) {}

  update() {
    const logList = this.log.getState();
    const userLog = document.querySelector(`.user-log-news.${this.user}`);
    if (userLog) {
      const li = document.createElement("li");
      const updatedLog = logList.slice(-1)[0];
      li.appendChild(document.createTextNode(updatedLog));
      userLog.appendChild(li);
    }
  }
}
