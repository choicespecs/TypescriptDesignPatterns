const RESPONSE_NUMBERS = [404, 200, 503, 511]
const requestButton = document.querySelector(".requestButton")!;
const serverResponse = document.querySelector(".server.response")!;
const userContent = document.querySelector(".user.content")!;
const userArticle = document.querySelector(".user.article")!;
const log : string[] = []


function cleanDisplay() {
    userContent.innerHTML = "";
    userArticle.innerHTML = "";
}

interface WebPage {
    display() : void;
}

type HTTPResponse = {
    code: number;
    content?: string;
    article?: string
}

interface WebPageGenerator {
    createWebPage(response: HTTPResponse) : WebPage;
}

function displayImage(path: string) {
    userContent.innerHTML = `<img src = '${path}' />`;
}

function displayArticle(article: string) {
    userArticle.innerHTML = `<p>${article}</p>`;
}

function getDate() : string {
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
    const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    return `${date} ${time}`
}

function logger(response: HTTPResponse, tag: number) {
    const date = getDate();
    if (tag === 0) {
        log.push(`CODE: ${response.code}, DATE: ${date}`)
    } else {
        log.push(`SECURITY WARNING, CODE: ${response.code}, DATE: ${date}`)
    }
    console.log(log);
}

class DefaultWebPage implements WebPage{
    private defaultImg = "./";
    private defaultArticle = "TECHCO: Recent Innovations have created the most innovative technologies for the 21st century";

    display() {
       displayImage(this.defaultImg);
       displayArticle(this.defaultArticle);
    }
}

class SecurityWebPage implements WebPage{
    private securityImg = "./";
    private securityWarning = "Cannot access";

    constructor(private response: HTTPResponse) {}

    display(){
        displayImage(this.securityImg);
        displayArticle(this.securityWarning)
        logger(this.response, -1);
    }   
}

class ContentWebPage implements WebPage {
    constructor(private response: HTTPResponse) {}
    display() {
        displayImage(this.response.content!);
        displayArticle(this.response.article!);
    }
}

class ServiceWebPage implements WebPage {
    constructor(private response: HTTPResponse) {}

    display() {
        displayImage(this.response.content!);
        displayArticle(this.response.article!);
        logger(this.response, 0);
    }
}

class ContentWebPageResponse implements WebPageGenerator {
    createWebPage(response: HTTPResponse): WebPage {
        if (response.code === 404) {
            return new DefaultWebPage;
        } else {
            return new ContentWebPage(response);
        }
    }
}

class SecurityWebPageResponse implements WebPageGenerator {
    createWebPage(response: HTTPResponse): WebPage {
        if (response.code === 511) {
            return new SecurityWebPage(response);
        } else {
            return new ServiceWebPage(response);
        }
    }
}

class HTTPWebResponse implements WebPageGenerator {
    constructor(private contentResponse : ContentWebPageResponse, private securityResponse : SecurityWebPageResponse) {}

    createWebPage(response: HTTPResponse) : WebPage { 
        let USER_PAGE_RESPONSE! : WebPage;
        switch(response.code) {
            case 503:
            case 511: {
                USER_PAGE_RESPONSE = this.securityResponse.createWebPage(response);
                break;
            }
            default: {
                USER_PAGE_RESPONSE = this.contentResponse.createWebPage(response);
                break;
            }
        }
        return USER_PAGE_RESPONSE;
    }
}


addEventListener("click", () => {
    const response = RESPONSE_NUMBERS[Math.floor(Math.random() * (4))]
    let responseString : string = ""
    switch(response) {
        case 404:
            responseString = "Not Found"
            break
        case 200:
            responseString = "OK"
            break
        case 503:
            responseString = "Service Unavailable"
            break
        case 511:
            responseString = "Network Authentication Required"
            break
    }
    serverResponse.innerHTML = response.toString() + "<br>" + responseString
})


