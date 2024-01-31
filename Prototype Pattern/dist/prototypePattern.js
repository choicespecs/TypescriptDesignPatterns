"use strict";
// Base Menu Prototype
class MenuItem {
    constructor(label, icon, link, isVisible) {
        this.label = label;
        this.icon = icon;
        this.link = link;
        this.isVisible = isVisible;
    }
    clone() {
        return new MenuItem(this.label, this.icon, this.link, this.isVisible);
    }
}
// Client code
const menuItems = [];
// Create base menu prototype
const baseMenuItemPrototype = new MenuItem("Home", "home-icon", "#", true);
// Clone base menu prototype to create menu items
const menuItem1 = baseMenuItemPrototype.clone();
menuItem1.label = "About";
menuItem1.link = "about.html";
const menuItem2 = baseMenuItemPrototype.clone();
menuItem2.label = "Services";
menuItem2.link = "services.html";
// Add cloned menu items to menuItems array
menuItems.push(menuItem1, menuItem2);
// Render menu items
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
