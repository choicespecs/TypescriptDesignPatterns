const RESPONSE_NUMBERS = [404, 200, 503, 511]

const RESPONSE_CONTENT = [
    "./images/response1.jpg",
    "./images/response2.jpg",
    "./images/response3.jpg",
    "./images/response4.jpg"
]

const RESPONSE_ARTICLE = [
    'Information about the latest trends were given to the local authorities', 
    'incredibly its unsound inauthority meant more individuals were unable to report',
    'Understated staff could not be involved in the demise of the corporation',
    'Cannot be given enough notice to care stated the staff at the nearby pool'
]

const requestButton = document.querySelector(".requestButton")!;
const serverResponse = document.querySelector(".server.response")!;
const clientResponse = document.querySelector(".client.response")!;
const userContent = document.querySelector(".user.content")!;
const userArticle = document.querySelector(".user.article")!;
const log : string[] = []

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
    private defaultImg = "./images/default.jpg";
    private defaultArticle = "TECHCO: Recent Innovations have created the most innovative technologies for the 21st century";

    display() {
       displayImage(this.defaultImg);
       displayArticle(this.defaultArticle);
    }
}

class SecurityWebPage implements WebPage{
    private securityImg = "./images/stop.jpg";
    private securityWarning = "Cannot access";

    constructor(private response: HTTPResponse) {}

    display(){
        displayImage(this.securityImg);
        displayArticle(this.securityWarning)
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
            logger(response, -1);
            return new SecurityWebPage(response);
        } else {
            logger(response, 0);
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

function createResponse() : HTTPResponse {
    const code = RESPONSE_NUMBERS[Math.floor(Math.random() * (4))]
    const content = RESPONSE_CONTENT[Math.floor(Math.random() * (4))]
    const article = RESPONSE_ARTICLE[Math.floor(Math.random() * (4))]
    return {
        code: code,
        content: content,
        article: article
    }
}
const HTTPResponseFactory = new HTTPWebResponse(new ContentWebPageResponse(), new SecurityWebPageResponse());

requestButton.addEventListener("click", () => {
    const response = createResponse();
    const webPage = HTTPResponseFactory.createWebPage(response);
    webPage.display();
    let responseString = ""
    let responseContent = ""
    let responseArticle = ""
    switch(response.code) {
        case 404:
            responseString = "Not Found"
            responseContent = "Default Page"
            responseArticle = "Default Page"
            break
        case 200:
            responseString = "OK"
            responseContent = response.content!
            responseArticle = response.article!
            break
        case 503:
            responseString = "Service Unavailable"
            responseContent = response.content!
            responseArticle = response.article!
            break
        case 511:
            responseString = "Network Authentication Required"
            responseContent = "CANNOT CONNECT"
            responseArticle = "CANNOT CONNECT"
            break
    }

    serverResponse.innerHTML = response.code.toString() + "<br>" + responseString
    if (response.code === 503) {
        clientResponse.innerHTML = `<h5>STATUS:</h5> CLIENT ISSUE LOGGED <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
    } else if (response.code === 511) {
        clientResponse.innerHTML = `<h5>STATUS:</h5> SECURITY ISSUE LOGGED <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
    } else if (response.code === 404) {
        clientResponse.innerHTML = `<h5>STATUS:</h5> CONTENT NOT FOUND <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
    } else {
        clientResponse.innerHTML = `<h5>STATUS:</h5> OK <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;

    }

})

