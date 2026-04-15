// Observer Pattern — Entry point / client
// Creates the Subject (Log), subscribes three User observers, and wires DOM controls.

import { Log } from "./models/Log";
import { User } from "./models/User";

const timeWindow = document.querySelector(".time-window");
const logUpdates = document.querySelector(".log-updates");

const log = new Log();
const user1 = new User(log, "user1");
const user2 = new User(log, "user2");
const user3 = new User(log, "user3");

// Subscribe all three observers to the subject
log.add(user1);
log.add(user2);
log.add(user3);

setInterval(() => {
  if (timeWindow) {
    const li = document.createElement("li");
    const time = Date.now().toString();
    li.appendChild(document.createTextNode(time));
    timeWindow.appendChild(li);

    log.setTime(time);
  }
}, 2000);

function updateLog(userLog: string) {
  let li = document.createElement("li");
  const timeList = log.getTime();
  const recentTime = timeList.slice(-1)[0];
  const uniqueLog: string = `${recentTime} ${userLog}`;
  li.appendChild(document.createTextNode(uniqueLog));
  logUpdates?.appendChild(li);

  log.setState(uniqueLog); // Mutates subject state and triggers notify() → all observers update
}

const user1Button = document.querySelector(".user1-button")!;
const user2Button = document.querySelector(".user2-button")!;
const user3Button = document.querySelector(".user3-button")!;

user1Button.addEventListener("click", () => {
  updateLog("user1");
});
user2Button.addEventListener("click", () => {
  updateLog("user2");
});
user3Button.addEventListener("click", () => {
  updateLog("user3");
});
