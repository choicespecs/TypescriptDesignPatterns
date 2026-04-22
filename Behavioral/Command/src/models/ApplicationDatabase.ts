// Command Pattern — Receiver
// Performs the real work: inserting and deleting records from an in-memory array
// and reflecting those changes in the DOM.

import { Database } from "../interfaces/Database";
import { Data } from "../types/Data";

export class ApplicationDatabase implements Database {
  constructor(
    private database: Data[],
    private usernameList: HTMLElement,
    private infoList: HTMLElement,
    private deleteList: HTMLElement,
    private actionList: HTMLElement
  ) {}

  // isUndo=true: reverse a previous log entry instead of adding a new one
  insert(data: Data, isUndo = false) {
    this.database.push(data);
    this.usernameList.appendChild(this.createLi(data.username, data.id));
    this.infoList.appendChild(this.createLi(data.information, data.id));
    this.deleteList.appendChild(this.createDeleteBtn(data.id));
    if (isUndo) {
      this.removeLastLog();
    } else {
      this.addLog(`Insert: [User: ${data.username} Info: ${data.information}]`, "insert");
    }
  }

  // isUndo=true: reverse a previous log entry instead of adding a new one
  delete(data: Data, isUndo = false) {
    const idx = this.database.findIndex((obj) => obj.id === data.id);
    if (idx !== -1) this.database.splice(idx, 1);
    this.removeById(this.usernameList, data.id);
    this.removeById(this.infoList, data.id);
    this.removeById(this.deleteList, data.id);
    if (isUndo) {
      this.removeLastLog();
    } else {
      this.addLog(`Delete: [User: ${data.username} Info: ${data.information}]`, "delete");
    }
  }

  private createLi(text: string, id: number) {
    const li = document.createElement("li");
    li.dataset.id = String(id);
    li.appendChild(document.createTextNode(text));
    return li;
  }

  private createDeleteBtn(id: number) {
    const li = document.createElement("li");
    li.dataset.id = String(id);
    const btn = document.createElement("button");
    btn.className = "btn-delete";
    btn.textContent = "Delete";
    btn.setAttribute("onclick", `deleteRecord(${id})`);
    li.appendChild(btn);
    return li;
  }

  private removeById(list: HTMLElement, id: number) {
    const li = list.querySelector(`li[data-id="${id}"]`);
    if (li) list.removeChild(li);
  }

  private addLog(message: string, action: "insert" | "delete") {
    const li = document.createElement("li");
    if (action === "delete") li.classList.add("action-delete");
    li.appendChild(document.createTextNode(message));
    this.actionList.appendChild(li);
  }

  private removeLastLog() {
    const li = this.actionList.querySelector("li:last-child");
    if (li) this.actionList.removeChild(li);
  }
}
