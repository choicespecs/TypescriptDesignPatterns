// Command Pattern — Entry point / client
// Wires DOM form, undo button, and per-row delete buttons to the Invoker (DatabaseApplication).

import { Data } from "./types/Data";
import { ApplicationDatabase } from "./models/ApplicationDatabase";
import { DatabaseApplication } from "./models/DatabaseApplication";

const form = document.querySelector("form");
const usernameList = document.querySelector(".username-list") as HTMLElement;
const infoList = document.querySelector(".information-list") as HTMLElement;
const deleteList = document.querySelector(".delete-list") as HTMLElement;
const undoButton = document.querySelector(".undo-btn");
const actionList = document.querySelector(".actions") as HTMLElement;

let curr_id = 0;
const database: Data[] = [];
const databaseApp = new DatabaseApplication(
  new ApplicationDatabase(database, usernameList, infoList, deleteList, actionList)
);

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const elements = form.elements!;
  curr_id += 1;
  const data = {
    id: curr_id,
    username: (elements[0] as HTMLFormElement).value.toString(),
    information: (elements[1] as HTMLFormElement).value.toString(),
  };
  databaseApp.insert(data);
});

undoButton?.addEventListener("click", () => {
  databaseApp.undo();
});

function deleteRecord(id: number) {
  const record = database.find((d) => d.id === id);
  if (record) databaseApp.delete(record);
}

(window as any).deleteRecord = deleteRecord;
