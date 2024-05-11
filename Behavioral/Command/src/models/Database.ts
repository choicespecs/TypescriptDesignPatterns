export type Data = {
  id: number;
  username: string;
  information: string;
};

export interface Database {
  insert(data: Data): void;
  delete(data: Data): void;
}

export class ApplicationDatabase implements Database {
  constructor(
    private database: Data[],
    private usernameList: HTMLElement,
    private infoList: HTMLElement,
    private actionList: HTMLElement
  ) {}

  insert(data: Data) {
    this.database.push(data);
    this.addUsername(data.username);
    this.addInfo(data.information);
    this.addLog(data);
  }

  delete(data: Data) {
    this.database = this.database.filter((obj: Data) => {
      return obj.id !== data.id;
    });
    this.deleteInfo();
    this.deleteUsername();
    this.deleteLog();
  }

  private createTextNode(string: string) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(string));
    return li;
  }

  private addUsername(username: string) {
    this.usernameList.appendChild(this.createTextNode(username));
  }

  private addInfo(info: string) {
    this.infoList.appendChild(this.createTextNode(info));
  }

  private addLog(data: Data) {
    this.actionList.appendChild(
      this.createTextNode(
        `Insert: [User: ${data.username} Info: ${data.information}]`
      )
    );
  }

  private deleteUsername() {
    let li = this.usernameList.querySelector("li:last-child");
    if (li) {
      this.usernameList.removeChild(li);
    }
  }

  private deleteInfo() {
    let li = this.infoList.querySelector("li:last-child");
    if (li) {
      this.infoList.removeChild(li);
    }
  }

  private deleteLog() {
    let li = this.actionList.querySelector("li:last-child");
    if (li) {
      this.actionList.removeChild(li);
    }
  }
}
