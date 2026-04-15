// Template Method Pattern — Entry point / client
// Simulates an application lifecycle and demonstrates all three log severity levels.

import { InfoLog } from "./models/InfoLog";
import { TraceLog } from "./models/TraceLog";
import { ErrorLog } from "./models/ErrorLog";
import { logHelper } from "./models/logHelper";

const applicationWindow = document?.querySelector(".application-run");
let i = 0;

function runApplication(i: number) {
  logHelper(new TraceLog(), "Application run"); // Trace marks the start of a run
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(new Number(i).toString()));
  logHelper(
    new InfoLog(),
    `Created Number Node & Created Number ${new Number(i).toString()} String`
  );
  applicationWindow?.appendChild(li);
  logHelper(new TraceLog(), "Application Finished"); // Trace marks the end of a run
}

setInterval(() => {
  if (i != 5 && i < 11) {
    runApplication(i);
  } else if (i === 5 && i < 11) {
    // Simulate a failure at iteration 5 — triggers ErrorLog which also fires highTierNotify()
    logHelper(new ErrorLog(), "Could not create Number node or Number String");
  }
  i++;
}, 2000);
