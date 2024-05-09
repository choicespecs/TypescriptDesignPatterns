const applicationWindow = document?.querySelector(".application-run");
const logWindow = document?.querySelector(".log");

let i = 0;
abstract class LogTemplate {

    public log(message: string) {
        this.notify();
        this.saveLog(message);
        this.highTierNotify();
    }

    protected saveLog(message: string) {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(message));
        logWindow?.appendChild(li);
    }

    protected abstract notify() : void;

    protected highTierNotify() {}
}

class InfoLog extends LogTemplate {
    protected notify(): void {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("INFO: LOGGED"));
        logWindow?.appendChild(li);
    }
}

class TraceLog extends LogTemplate {
    protected notify(): void {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("TRACE: LOGGED"));
        logWindow?.appendChild(li);
    }
}

class ErrorLog extends LogTemplate {
    protected notify(): void {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode("ERROR: LOGGED"));
        logWindow?.appendChild(li);
    }

    protected highTierNotify() {
        console.log("DANGER: ERROR HAS BEEN DETECTED");
    }
}

function logHelper(logger : LogTemplate, message: string) {
    logger.log(message);
}

function runApplication(i : number) {
    logHelper(new TraceLog(), "Application run");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(new Number(i).toString()));
    logHelper(new InfoLog(), `Created Number Node & Created Number ${new Number(i).toString()} String`);
    applicationWindow?.appendChild(li);
    logHelper(new TraceLog(), "Application Finished");
}

setInterval(() => {
    if (i != 5 && i < 11) {
        runApplication(i);
    } else if (i === 5 && i < 11) {
        logHelper(new ErrorLog(), "Could not create Number node or Number String");
    }
    i++;
}, 2000);


