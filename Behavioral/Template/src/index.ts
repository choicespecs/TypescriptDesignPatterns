import { InfoLog } from "./models/InfoLog";
import { TraceLog } from "./models/TraceLog";
import { ErrorLog } from "./models/ErrorLog";
import { logHelper } from "./models/logHelper";

const applicationWindow = document?.querySelector(".application-run");
let i = 0;

function runApplication(i: number) {
  logHelper(new TraceLog(), "Application run");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(new Number(i).toString()));
  logHelper(
    new InfoLog(),
    `Created Number Node & Created Number ${new Number(i).toString()} String`
  );
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
