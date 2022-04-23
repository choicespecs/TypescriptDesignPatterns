const RESPONSE_NUMBERS = [404, 200, 503, 511]
const requestButton = document.querySelector(".requestButton")!;
const serverResponse = document.querySelector(".server.response")!;
const userContent = document.querySelector(".user.content")!;
const userArticle = document.querySelector(".user.article")!;


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

class DefaultWebPage implements WebPage{
    display() {
       console.log("Web Page")
    }
}

class SecurityWebPage implements WebPage{
    constructor(private response: HTTPResponse) {}

    display(){
        console.log("Security");
    }
}

class ContentWebPage implements WebPage {
    constructor(private response: HTTPResponse) {}
    display() {
        console.log("Content");
    }
}

class ServiceWebPage implements WebPage {
    constructor(private response: HTTPResponse) {}

    display() {
        console.log("Service");
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


