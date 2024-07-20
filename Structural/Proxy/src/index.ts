import { User } from "./models/User";
import { ProtectionProxyDatabaseAccess } from "./models/ProtectionProxyDatabaseAccess";

const form = document.querySelector("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
});
const databaseList = document.querySelector(".database-list");
const databaseContent = document.querySelector(".database-content");
const warningContent = document.querySelector(".warning-content");
const writeAccessButton = document.querySelector(".write-access");
const writeDatabaseInput = <HTMLInputElement>(
  document.querySelector(".write-database")
);

function insertDatabase(data: string) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(data));
  databaseList?.appendChild(li);
}

let writeAccess = false;
const user = new User(writeAccess);

writeAccessButton?.addEventListener("click", () => {
  if (!user.writeAccess) {
    writeAccessButton?.classList.remove("deny");
    writeAccessButton?.classList.add("allow");
    writeDatabaseInput?.classList.remove("deny");
    user.writeAccess = true;
  } else {
    writeAccessButton?.classList.remove("allow");
    writeAccessButton?.classList.add("deny");
    writeDatabaseInput?.classList.add("deny");
    user.writeAccess = false;
  }
});

function addDatabase() {
  const form = document.querySelector("form")!;
  const elements = form.elements!;
  const data = (elements[0] as HTMLFormElement).value.toString();
  writeDatabaseInput.value = "";
  const proxyDatabase = new ProtectionProxyDatabaseAccess(user, data);
  proxyDatabase.writeData();
}
