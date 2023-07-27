// Server Timer
const timeWindow = document?.querySelector(".time-window");
const logUpdates = document.querySelector(".log-updates")!;

interface Subject {
  add(observer: Observer): void;
  remove(observer: Observer): void;
  notify(): void;
}

interface Observer {
  update(): void;
}

class Log implements Subject {
  ObserverList: Observer[] = [];
  uniqueTimes: string[] = [];
  logList: string[] = [];

  add(observer: Observer) {
    this.ObserverList.push(observer);
  }

  remove(observer: Observer) {
    this.ObserverList.filter((val) => {
      val !== observer;
    });
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

class User implements Observer {
  constructor(private log: Log, private user: string) {}

  update() {
    const logList = log.getState();
    const userLog = document.querySelector(`.user-log-news.${this.user}`);
    let li = document.createElement("li");
    const updatedLog = logList.slice(-1)[0];
    li.appendChild(document.createTextNode(updatedLog));
    userLog?.appendChild(li);
  }
}

const log = new Log();
const user1 = new User(log, "user1");
const user2 = new User(log, "user2");
const user3 = new User(log, "user3");

log.add(user1);
log.add(user2);
log.add(user3);

setInterval(() => {
  let li = document.createElement("li");
  const time = Date.now().toString();
  li.appendChild(document.createTextNode(time));
  timeWindow?.appendChild(li);

  log.setTime(time);
}, 2000);

function updateLog(userLog: string) {
  let li = document.createElement("li");
  const timeList = log.getTime();
  const recentTime = timeList.slice(-1)[0];
  const uniqueLog: string = `${recentTime} ${userLog}`;
  li.appendChild(document.createTextNode(uniqueLog));
  logUpdates?.appendChild(li);

  log.setState(uniqueLog);
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
