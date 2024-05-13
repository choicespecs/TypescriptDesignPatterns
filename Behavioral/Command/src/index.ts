import { Data } from "./models/Database";
import { ApplicationDatabase } from "./models/Database";
import { DatabaseApplication } from "./models/DatabaseApplication";

const form = document.querySelector("form");
const usernameList = document.querySelector(".username-list") as HTMLElement;
const infoList = document.querySelector(".information-list") as HTMLElement;
const undoButton = document.querySelector(".undo-btn");
const actionList = document.querySelector(".actions") as HTMLElement;

let curr_id = 0;
const database: Data[] = [];
const databaseApp = new DatabaseApplication(
  new ApplicationDatabase(database, usernameList, infoList, actionList)
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
