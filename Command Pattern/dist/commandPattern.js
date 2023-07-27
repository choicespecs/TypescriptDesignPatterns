"use strict";
const form = document.querySelector('form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
});
const usernameList = document.querySelector('.username-list');
const infoList = document.querySelector('.information-list');
const undoButton = document.querySelector('.undo-btn');
const actionList = document.querySelector('.actions');
function addUsername(username) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(username));
    usernameList === null || usernameList === void 0 ? void 0 : usernameList.appendChild(li);
}
function addInfo(info) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(info));
    infoList === null || infoList === void 0 ? void 0 : infoList.appendChild(li);
}
function deleteUsername() {
    let li = usernameList === null || usernameList === void 0 ? void 0 : usernameList.querySelector('li:last-child');
    if (li) {
        usernameList === null || usernameList === void 0 ? void 0 : usernameList.removeChild(li);
    }
}
function deleteInfo() {
    let li = infoList === null || infoList === void 0 ? void 0 : infoList.querySelector('li:last-child');
    if (li) {
        infoList === null || infoList === void 0 ? void 0 : infoList.removeChild(li);
    }
}
function addLog(data) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`Insert: [User: ${data.username} Info: ${data.information}]`));
    actionList === null || actionList === void 0 ? void 0 : actionList.appendChild(li);
}
function deleteLog() {
    let li = actionList === null || actionList === void 0 ? void 0 : actionList.querySelector('li:last-child');
    if (li) {
        actionList === null || actionList === void 0 ? void 0 : actionList.removeChild(li);
    }
}
class ApplicationDatabase {
    constructor(database) {
        this.database = database;
    }
    insert(data) {
        this.database.push(data);
        addUsername(data.username);
        addInfo(data.information);
        addLog(data);
    }
    delete(data) {
        deleteInfo();
        deleteUsername();
        deleteLog();
        this.database = this.database.filter((obj) => {
            return obj.id !== data.id;
        });
    }
}
class InsertDatabase {
    constructor(database, data) {
        this.database = database;
        this.data = data;
    }
    execute() {
        this.database.insert(this.data);
    }
    undo() {
        this.database.delete(this.data);
    }
}
class DeleteDatabase {
    constructor(database, data) {
        this.database = database;
        this.data = data;
    }
    execute() {
        this.database.delete(this.data);
    }
    undo() {
        this.database.insert(this.data);
    }
}
class DatabaseApplication {
    constructor(database) {
        this.database = database;
        this.commandList = [];
    }
    insert(data) {
        const command = new InsertDatabase(this.database, data);
        this.commandList.push(command);
        command.execute();
    }
    delete(data) {
        const command = new DeleteDatabase(this.database, data);
        this.commandList.push(command);
        command.execute();
    }
    undo() {
        const command = this.commandList.pop();
        command === null || command === void 0 ? void 0 : command.undo();
    }
}
let curr_id = 0;
const database = [];
const databaseApp = new DatabaseApplication(new ApplicationDatabase(database));
function myFunction() {
    const form = document.querySelector('form');
    const elements = form.elements;
    curr_id += 1;
    const data = {
        id: curr_id,
        username: elements[0].value.toString(),
        information: elements[1].value.toString()
    };
    databaseApp.insert(data);
}
undoButton === null || undoButton === void 0 ? void 0 : undoButton.addEventListener('click', () => {
    databaseApp.undo();
});
