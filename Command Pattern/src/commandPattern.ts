const form = document.querySelector('form');
form?.addEventListener('submit', (e) => {
    e.preventDefault();
})
const usernameList = document.querySelector('.username-list');
const infoList = document.querySelector('.information-list');
const undoButton = document.querySelector('.undo-btn');
const actionList = document.querySelector('.actions');


type Data = {
    id: number;
    username: string;
    information: string;
}

interface Database {
    insert(data: Data) : void;
    delete(data: Data) : void;
}

function addUsername(username : string) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(username));
    usernameList?.appendChild(li);
}

function addInfo(info : string) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(info));
    infoList?.appendChild(li);
}

function deleteUsername() {
    let li = usernameList?.querySelector('li:last-child');
    if (li) {
        usernameList?.removeChild(li);
    }
}

function deleteInfo() {
    let li = infoList?.querySelector('li:last-child');
    if (li) {
        infoList?.removeChild(li);
    }
}

function addLog(data : Data) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`Insert: [User: ${data.username} Info: ${data.information}]`));
    actionList?.appendChild(li);
}

function deleteLog() {
    let li = actionList?.querySelector('li:last-child');
    if (li) {
        actionList?.removeChild(li);
    }
}

class ApplicationDatabase implements Database {
    constructor(private database : Data[]) {}

    insert(data : Data) {
        this.database.push(data);
        addUsername(data.username);
        addInfo(data.information);
        addLog(data);
    }

    delete(data: Data) {
        deleteInfo();
        deleteUsername();
        deleteLog();
        this.database = this.database.filter((obj : Data) => {
            return obj.id !== data.id;
        })
    }
}

interface Command {
    execute(): any;
    undo() : any;
}

class InsertDatabase implements Command {
    constructor(private database: ApplicationDatabase, private data : Data) {}
    execute() {
        this.database.insert(this.data);
    }
    undo() {
        this.database.delete(this.data);
    }
}

class DeleteDatabase implements Command {
    constructor(private database: ApplicationDatabase, private data : Data) {}
    execute() {
        this.database.delete(this.data);
    }
    undo() {
        this.database.insert(this.data);
    }
}

class DatabaseApplication {
    private commandList : Command[] = [];

    constructor(private database: ApplicationDatabase) {}

    insert(data: Data) {
        const command = new InsertDatabase(this.database, data);
        this.commandList.push(command);
        command.execute();
    }

    delete(data : Data) {
        const command = new DeleteDatabase(this.database, data);
        this.commandList.push(command);
        command.execute();
    }

    undo() {
        const command = this.commandList.pop();
        command?.undo();
    }
}



let curr_id = 0;
const database : Data[] = [];
const databaseApp = new DatabaseApplication(new ApplicationDatabase(database));

function myFunction() {
    const form = document.querySelector('form')!;
    const elements = form.elements!;
    curr_id += 1;
    const data = {
        id: curr_id, 
        username: (elements[0] as HTMLFormElement).value.toString(),
        information: (elements[1] as HTMLFormElement).value.toString()
    }
    databaseApp.insert(data);
}

undoButton?.addEventListener('click', () => {
  databaseApp.undo();
})


