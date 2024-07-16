import { TextTheme } from "./classes/text/TextTheme";
import { ImageTheme } from "./classes/image/ImageTheme";

const changeThemeButton = document.querySelector(".change-theme-button")!;
const themeName = document.querySelector(".theme-name-part")!;
const navigationButton = document.querySelector(".nav-button")!;
const windowButton = document.querySelector(".window-button")!;
const contentButton = document.querySelector(".content-button")!;
const resetButton = document.querySelector(".reset-button")!;
const actions = document.querySelector(".actions")!;

const themeWindow = document.querySelector(".theme")! as HTMLElement;
const themeNav = document.querySelector(".theme-nav")! as HTMLElement;
const themeContent = document.querySelector(".theme-content")! as HTMLElement;

const textTheme = new TextTheme(themeNav, themeWindow, themeContent);
const imageTheme = new ImageTheme(themeNav, themeWindow, themeContent);
let number = 1;
let currentTheme = "";
let textOn = false;
let imageOn = false;
let navSet = false;
let windowSet = false;
let contentSet = false;

function resetVariables() {
  (<HTMLElement>navigationButton).style.display = "block";
  (<HTMLElement>windowButton).style.display = "block";
  (<HTMLElement>contentButton).style.display = "block";
  (<HTMLElement>navigationButton).style.backgroundColor = "green";
  (<HTMLElement>windowButton).style.backgroundColor = "green";
  (<HTMLElement>contentButton).style.backgroundColor = "red";
  number = 1;
  actions.innerHTML = "";
  navSet = false;
  windowSet = false;
  contentSet = false;
  (<HTMLElement>resetButton).style.backgroundColor = "red";
}

function addAction(number: number, name: string) {
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(`${number}. Added ${name}`));
  actions?.appendChild(li);
}

function removeButton(element: Element) {
  (<HTMLElement>element).style.display = "none";
}

function setTextTheme() {
  currentTheme = "text";
  textOn = true;
  themeName.innerHTML = currentTheme;
  (<HTMLElement>navigationButton).style.backgroundColor = "green";
  (<HTMLElement>windowButton).style.backgroundColor = "green";
}

function setImageTheme() {
  currentTheme = "image";
  imageOn = true;
  themeName.innerHTML = currentTheme;
  (<HTMLElement>navigationButton).style.backgroundColor = "green";
  (<HTMLElement>windowButton).style.backgroundColor = "green";
}

function setNavigation(textThemeOn: boolean, imageThemeOn: boolean) {
  if (textThemeOn) {
    textTheme.createNavigation().display();
  }
  if (imageThemeOn) {
    imageTheme.createNavigation().display();
  }
}

function setWindow(textThemeOn: boolean, imageThemeOn: boolean) {
  if (textThemeOn) {
    textTheme.createWindow().display();
  }
  if (imageThemeOn) {
    imageTheme.createWindow().display();
  }
}

function setContent(textThemeOn: boolean, imageThemeOn: boolean) {
  if (textThemeOn) {
    textTheme.createContent().display();
  }
  if (imageThemeOn) {
    imageTheme.createContent().display();
  }
}

function resetWindow() {
  themeWindow.style.backgroundColor = "transparent";
  themeWindow.style.overflow = "visible";
  themeWindow.style.borderRadius = "0";
}

function resetNavigation() {
  themeNav.style.backgroundColor = "transparent";
  themeNav.style.height = "0";
}

function resetContent() {
  themeContent.style.padding = "0";
  themeContent.innerHTML = "";
}

navigationButton.addEventListener("click", () => {
  if (textOn || imageOn) {
    removeButton(navigationButton);
    addAction(number, `${currentTheme} navigation`);
    number += 1;
    navSet = true;
    (<HTMLElement>resetButton).style.backgroundColor = "green";
    setNavigation(textOn, imageOn);
  }
});
windowButton.addEventListener("click", () => {
  if (textOn || imageOn) {
    removeButton(windowButton);
    addAction(number, `${currentTheme} window`);
    number += 1;
    windowSet = true;
    (<HTMLElement>contentButton).style.backgroundColor = "green";
    (<HTMLElement>resetButton).style.backgroundColor = "green";
    setWindow(textOn, imageOn);
  }
});
contentButton.addEventListener("click", () => {
  if ((textOn || imageOn) && windowSet) {
    removeButton(contentButton);
    addAction(number, `${currentTheme} content`);
    number += 1;
    contentSet = true;
    (<HTMLElement>resetButton).style.backgroundColor = "green";
    setContent(textOn, imageOn);
  }
});
resetButton.addEventListener("click", () => {
  if (textOn || imageOn) {
    resetVariables();
    resetWindow();
    resetNavigation();
    resetContent();
  }
});

changeThemeButton.addEventListener("click", () => {
  if (textOn === false) {
    setTextTheme();
    imageOn = false;
  } else {
    setImageTheme();
    textOn = false;
  }
});
