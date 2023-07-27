"use strict";
const applicationWindow = document === null || document === void 0 ? void 0 : document.querySelector(".application-run");
const logWindow = document === null || document === void 0 ? void 0 : document.querySelector(".log");
let i = 0;
class LogTemplate {
    log(message) {
        this.notify();
        this.saveLog(message);
        this.highTierNotify();
    }
    saveLog(message) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(message));
        logWindow === null || logWindow === void 0 ? void 0 : logWindow.appendChild(li);
    }
    highTierNotify() { }
}
class InfoLog extends LogTemplate {
    notify() {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("INFO: LOGGED"));
        logWindow === null || logWindow === void 0 ? void 0 : logWindow.appendChild(li);
    }
}
class TraceLog extends LogTemplate {
    notify() {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("TRACE: LOGGED"));
        logWindow === null || logWindow === void 0 ? void 0 : logWindow.appendChild(li);
    }
}
class ErrorLog extends LogTemplate {
    notify() {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("ERROR: LOGGED"));
        logWindow === null || logWindow === void 0 ? void 0 : logWindow.appendChild(li);
    }
    highTierNotify() {
        console.log("DANGER: ERROR HAS BEEN DETECTED");
    }
}
function logHelper(logger, message) {
    logger.log(message);
}
function runApplication(i) {
    logHelper(new TraceLog(), "Application run");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(new Number(i).toString()));
    logHelper(new InfoLog(), `Created Number Node & Created Number ${new Number(i).toString()} String`);
    applicationWindow === null || applicationWindow === void 0 ? void 0 : applicationWindow.appendChild(li);
    logHelper(new TraceLog(), "Application Finished");
}
setInterval(() => {
    if (i != 5 && i < 11) {
        runApplication(i);
    }
    else if (i === 5 && i < 11) {
        logHelper(new ErrorLog(), "Could not create Number node or Number String");
    }
    i++;
}, 2000);
