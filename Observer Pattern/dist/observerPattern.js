"use strict";
// Server Timer
const timeWindow = document === null || document === void 0 ? void 0 : document.querySelector(".time-window");
const logUpdates = document.querySelector(".log-updates");
class Log {
    constructor() {
        this.ObserverList = [];
        this.uniqueTimes = [];
        this.logList = [];
    }
    add(observer) {
        this.ObserverList.push(observer);
    }
    remove(observer) {
        this.ObserverList.filter((val) => {
            val !== observer;
        });
    }
    notify() {
        for (const observer of this.ObserverList) {
            observer.update();
        }
    }
    setTime(time) {
        this.uniqueTimes.push(time);
    }
    getTime() {
        return this.uniqueTimes;
    }
    getState() {
        return this.logList;
    }
    setState(logState) {
        this.logList.push(logState);
        this.notify();
    }
}
class User {
    constructor(log, user) {
        this.log = log;
        this.user = user;
    }
    update() {
        const logList = log.getState();
        const userLog = document.querySelector(`.user-log-news.${this.user}`);
        let li = document.createElement("li");
        const updatedLog = logList.slice(-1)[0];
        li.appendChild(document.createTextNode(updatedLog));
        userLog === null || userLog === void 0 ? void 0 : userLog.appendChild(li);
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
    timeWindow === null || timeWindow === void 0 ? void 0 : timeWindow.appendChild(li);
    log.setTime(time);
}, 2000);
function updateLog(userLog) {
    let li = document.createElement("li");
    const timeList = log.getTime();
    const recentTime = timeList.slice(-1)[0];
    const uniqueLog = `${recentTime} ${userLog}`;
    li.appendChild(document.createTextNode(uniqueLog));
    logUpdates === null || logUpdates === void 0 ? void 0 : logUpdates.appendChild(li);
    log.setState(uniqueLog);
}
const user1Button = document.querySelector(".user1-button");
const user2Button = document.querySelector(".user2-button");
const user3Button = document.querySelector(".user3-button");
user1Button.addEventListener("click", () => {
    updateLog("user1");
});
user2Button.addEventListener("click", () => {
    updateLog("user2");
});
user3Button.addEventListener("click", () => {
    updateLog("user3");
});
