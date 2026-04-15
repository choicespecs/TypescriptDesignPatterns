// Proxy Pattern — Entry point / client
// The user can toggle write access on/off; clicking "Add to database" creates a
// ProtectionProxyDatabaseAccess and calls writeData() on it.
// The proxy checks user.writeAccess before forwarding to RealDatabaseAccess.
// insertDatabase and addDatabase are exposed on window so HTML onclick can reach them.

import { User } from "./models/User";
import { ProtectionProxyDatabaseAccess } from "./models/ProtectionProxyDatabaseAccess";
import { appendListItem } from "../../../shared/dom-utils";

const form = document.querySelector("form");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
});

const databaseList = document.querySelector(".database-list");
const databaseContent = document.querySelector(".database-content"); // Unused — no matching element in HTML
const warningContent = document.querySelector(".warning-content");   // Unused — no matching element in HTML
const writeAccessButton = document.querySelector(".write-access");
const writeDatabaseInput = <HTMLInputElement>(
  document.querySelector(".write-database")
);

/**
 * Appends a new list item to the database display.
 * Called indirectly by RealDatabaseAccess via window.insertDatabase —
 * direct import would create a circular module dependency.
 */
function insertDatabase(data: string) {
  appendListItem(databaseList, data);
}

// The single User instance whose writeAccess flag the proxy reads
let writeAccess = false;
const user = new User(writeAccess);

// Toggle write access on/off and reflect the state in the UI
writeAccessButton?.addEventListener("click", () => {
  if (!user.writeAccess) {
    writeAccessButton?.classList.remove("deny");
    writeAccessButton?.classList.add("allow");
    writeDatabaseInput?.classList.remove("deny");
    user.writeAccess = true;  // Grant access
  } else {
    writeAccessButton?.classList.remove("allow");
    writeAccessButton?.classList.add("deny");
    writeDatabaseInput?.classList.add("deny");
    user.writeAccess = false; // Revoke access
  }
});

/**
 * Creates a ProtectionProxy for the current input value and calls writeData().
 * The proxy decides whether to forward the call to RealDatabaseAccess based on user.writeAccess.
 */
function addDatabase() {
  const form = document.querySelector("form")!;
  const elements = form.elements!;
  const data = (elements[0] as HTMLFormElement).value.toString();
  writeDatabaseInput.value = "";
  const proxyDatabase = new ProtectionProxyDatabaseAccess(user, data);
  proxyDatabase.writeData(); // Proxy gate — only writes if user has access
}

// Expose on window so HTML onclick and RealDatabaseAccess can reach these module-scoped functions
(window as any).insertDatabase = insertDatabase;
(window as any).addDatabase = addDatabase;
