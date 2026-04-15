// Prototype Pattern — Entry point / client
// Creates a base prototype and clones it to produce customised menu items.

import { MenuItem } from "./models/MenuItem";

const menuItems: MenuItem[] = [];

// One prototype instance acts as the template for all derived menu items
const baseMenuItemPrototype = new MenuItem("Home", "home-icon", "#", true);

// Clone the prototype and override only what differs — no repeated constructor arguments
const menuItem1 = baseMenuItemPrototype.clone();
menuItem1.label = "About";
menuItem1.link = "about.html";

const menuItem2 = baseMenuItemPrototype.clone();
menuItem2.label = "Services";
menuItem2.link = "services.html";

menuItems.push(menuItem1, menuItem2);

const menuContainer = document.getElementById("menu-container");
if (menuContainer) {
  menuItems.forEach((item) => {
    if (item.isVisible) {
      const menuItemElement = document.createElement("div");
      menuItemElement.classList.add("menu-item");
      menuItemElement.innerHTML = `
                <a href="${item.link}">
                    <i class="${item.icon}"></i>
                    ${item.label}
                </a>
            `;
      menuContainer.appendChild(menuItemElement);
    }
  });
}
