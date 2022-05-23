const changeThemeButton = document.querySelector(".change-theme-button")!;
const themeName = document.querySelector(".theme-name-part")!;
const navigationButton = document.querySelector(".nav-button")!;
const windowButton = document.querySelector(".window-button")!;
const contentButton = document.querySelector(".content-button")!;
const resetButton = document.querySelector(".reset-button")!;
const actions =  document.querySelector(".actions")!;


const themeWindow =  document.querySelector(".theme")! as HTMLElement;
const themeNav =  document.querySelector(".theme-nav")! as HTMLElement;
const themeContent =  document.querySelector(".theme-content")! as HTMLElement;



interface DisplayNavigation {
    display() : void;
}

interface DisplayWindow {
    display() : void;
}

interface DisplayContent {
    display() : void;
}

interface DisplayThemeGenerator {
    createNavigation() : DisplayNavigation;
    createWindow() : DisplayWindow;
    createContent() : DisplayContent;
}

class TextNavigation implements DisplayNavigation {
    display() {
        themeNav.style.height = '30px';
        themeNav.style.backgroundColor = '#663F46'
    }
}

class TextWindow implements DisplayWindow {
    display() {
        themeWindow.style.backgroundColor = 'pink';
        themeWindow.style.width = '300px';
    }
}

class TextContent implements DisplayContent {
    display() {
        themeContent.style.padding = '2em'
        themeContent.innerHTML = `<p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, at vero. Totam facere error ducimus suscipit sint, ea, alias possimus rerum expedita, dolor perspiciatis sapiente maiores vel quis velit facilis?<p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sit, at vero. Totam facere error ducimus suscipit sint, ea, alias possimus rerum expedita, dolor perspiciatis sapiente maiores vel quis velit facilis?<p>`
    }
}

class ImageNavigation implements DisplayNavigation {
    display() {
        themeNav.style.height = '30px'
        themeNav.style.backgroundColor = '#B07BAC'
    }
}

class ImageWindow implements DisplayWindow {
    display() {
        themeWindow.style.backgroundColor = '#D9D7DD';
        themeWindow.style.overflow = 'hidden';
        themeWindow.style.borderRadius = '2em';
        themeWindow.style.width = '600px';
    }
}

class ImageContent implements DisplayContent {
    display() {
        themeContent.innerHTML = `<img src='https://images.unsplash.com/photo-1653221651798-cdf2780f9c9e?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687'>`
    }
}

class TextTheme implements DisplayThemeGenerator {
    createNavigation(): TextNavigation {
        return new TextNavigation
    }
    createWindow(): TextWindow {
        return new TextWindow
    }
    createContent(): TextContent {
        return new TextContent
    }
}

class ImageTheme implements DisplayThemeGenerator {
    createNavigation(): ImageNavigation {
        return new ImageNavigation
    }
    createWindow(): ImageWindow {
        return new ImageWindow
    }
    createContent(): ImageContent {
        return new ImageContent
    }
}

const textTheme = new TextTheme();
const imageTheme = new ImageTheme();
let number = 1
let currentTheme = ''
let textOn = false;
let imageOn = false;
let navSet = false;
let windowSet = false;
let contentSet = false;

function resetVariables() {
    (<HTMLElement>navigationButton).style.display = 'block';
    (<HTMLElement>windowButton).style.display = 'block';
    (<HTMLElement>contentButton).style.display = 'block';
    (<HTMLElement>navigationButton).style.backgroundColor = 'green';
    (<HTMLElement>windowButton).style.backgroundColor = 'green';
    (<HTMLElement>contentButton).style.backgroundColor = 'red';
    number = 1;
    actions.innerHTML = '';
    navSet = false;
    windowSet = false;
    contentSet = false;
    (<HTMLElement>resetButton).style.backgroundColor = 'red';
}

function addAction(number : number, name : string) {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${number}. Added ${name}`));
    actions?.appendChild(li);
}

function removeButton(element : Element) {
    (<HTMLElement>element).style.display = 'none';
}

function setTextTheme() {
    currentTheme = 'text';
    textOn = true;
    themeName.innerHTML = currentTheme;
    (<HTMLElement>navigationButton).style.backgroundColor = 'green';
    (<HTMLElement>windowButton).style.backgroundColor = 'green';
}

function setImageTheme() {
    currentTheme = 'image';
    imageOn = true;
    themeName.innerHTML = currentTheme;
    (<HTMLElement>navigationButton).style.backgroundColor = 'green';
    (<HTMLElement>windowButton).style.backgroundColor = 'green';
}

function setNavigation(textThemeOn : boolean, imageThemeOn : boolean) {
    if (textThemeOn) {
        textTheme.createNavigation().display();
    } 
    if (imageThemeOn) {
        imageTheme.createNavigation().display();
    }
}

function setWindow(textThemeOn : boolean, imageThemeOn: boolean) {
    if (textThemeOn) {
        textTheme.createWindow().display();
    } 
    if (imageThemeOn) {
        imageTheme.createWindow().display();
    }
}

function setContent(textThemeOn : boolean, imageThemeOn: boolean) {
    if (textThemeOn) {
        textTheme.createContent().display();
    } 
    if (imageThemeOn) {
        imageTheme.createContent().display();
    }
}

function resetWindow() {
    themeWindow.style.backgroundColor = 'transparent';
    themeWindow.style.overflow = 'visible';
    themeWindow.style.borderRadius = '0';
}

function resetNavigation() {
    themeNav.style.backgroundColor = 'transparent'
    themeNav.style.height = '0';
}

function resetContent() {
    themeContent.style.padding = '0'
    themeContent.innerHTML = ''
}

navigationButton.addEventListener("click", () => {
    if (textOn || imageOn) {
        removeButton(navigationButton);
        addAction(number, `${currentTheme} navigation`);
        number += 1
        navSet = true;
        (<HTMLElement>resetButton).style.backgroundColor = 'green';
        setNavigation(textOn, imageOn);
    }
});
windowButton.addEventListener("click", () => {
    if (textOn || imageOn) {
        removeButton(windowButton);
        addAction(number, `${currentTheme} window`);
        number += 1
        windowSet = true;
        (<HTMLElement>contentButton).style.backgroundColor = 'green';
        (<HTMLElement>resetButton).style.backgroundColor = 'green';
        setWindow(textOn, imageOn);
    }
});
contentButton.addEventListener("click", () => {
    if ((textOn || imageOn) && windowSet) {
        removeButton(contentButton);
        addAction(number, `${currentTheme} content`);
        number += 1
        contentSet = true;
        (<HTMLElement>resetButton).style.backgroundColor = 'green';
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
})
