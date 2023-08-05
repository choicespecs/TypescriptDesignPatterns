"use strict";
const form = document.querySelector('form');
form === null || form === void 0 ? void 0 : form.addEventListener('submit', (e) => {
    e.preventDefault();
});
const databaseList = document.querySelector('.database-list');
const databaseContent = document.querySelector('.database-content');
const warningContent = document.querySelector('.warning-content');
const writeAccessButton = document.querySelector('.write-access');
const writeDatabaseInput = document.querySelector('.write-database');
function insertDatabase(data) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(data));
    databaseList === null || databaseList === void 0 ? void 0 : databaseList.appendChild(li);
}
class RealDatabaseAccess {
    constructor(data) {
        this.data = data;
    }
    writeData() {
        insertDatabase(this.data);
        console.log("Real write into database");
    }
}
class ProtectionProxyDatabaseAccess {
    constructor(user, data) {
        this.user = user;
        this.data = data;
        this.realDatabaseAccess = null;
        if (user.writeAccess) {
            this.realDatabaseAccess = new RealDatabaseAccess(data);
            console.log("User has write access");
        }
        else {
            console.log("User does not have write access");
        }
    }
    writeData() {
        if (this.realDatabaseAccess && this.user.writeAccess) {
            this.realDatabaseAccess.writeData();
            console.log("Proxy write into database");
        }
    }
}
class User {
    constructor(_writeAccess) {
        this._writeAccess = _writeAccess;
    }
    get writeAccess() {
        return this._writeAccess;
    }
    set writeAccess(access) {
        this._writeAccess = access;
    }
}
let writeAccess = false;
const user = new User(writeAccess);
writeAccessButton === null || writeAccessButton === void 0 ? void 0 : writeAccessButton.addEventListener('click', () => {
    if (!user.writeAccess) {
        writeAccessButton === null || writeAccessButton === void 0 ? void 0 : writeAccessButton.classList.remove("deny");
        writeAccessButton === null || writeAccessButton === void 0 ? void 0 : writeAccessButton.classList.add("allow");
        writeDatabaseInput === null || writeDatabaseInput === void 0 ? void 0 : writeDatabaseInput.classList.remove("deny");
        user.writeAccess = true;
    }
    else {
        writeAccessButton === null || writeAccessButton === void 0 ? void 0 : writeAccessButton.classList.remove("allow");
        writeAccessButton === null || writeAccessButton === void 0 ? void 0 : writeAccessButton.classList.add("deny");
        writeDatabaseInput === null || writeDatabaseInput === void 0 ? void 0 : writeDatabaseInput.classList.add("deny");
        user.writeAccess = false;
    }
});
function addDatabase() {
    const form = document.querySelector('form');
    const elements = form.elements;
    const data = elements[0].value.toString();
    writeDatabaseInput.value = "";
    const proxyDatabase = new ProtectionProxyDatabaseAccess(user, data);
    proxyDatabase.writeData();
}
