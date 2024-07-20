import { HTTPResponse } from "./types/HTTPResponse";
import { HTTPWebResponse } from "./models/response/HTTPWebResponse";
import { ContentWebPageResponse } from "./models/response/ContentWebPageResponse";
import { SecurityWebPageResponse } from "./models/response/SecurityWebPageResponse";

const RESPONSE_NUMBERS = [404, 200, 503, 511];

const RESPONSE_CONTENT = [
  "./images/response1.jpg",
  "./images/response2.jpg",
  "./images/response3.jpg",
  "./images/response4.jpg",
];

const RESPONSE_ARTICLE = [
  "Information about the latest trends were given to the local authorities",
  "incredibly its unsound inauthority meant more individuals were unable to report",
  "Understated staff could not be involved in the demise of the corporation",
  "Cannot be given enough notice to care stated the staff at the nearby pool",
];

const requestButton = document.querySelector(".requestButton")!;
const serverResponse = document.querySelector(".server.response")!;
const clientResponse = document.querySelector(".client.response")!;
const userContent = document.querySelector(".user.content")! as HTMLElement;
const userArticle = document.querySelector(".user.article")! as HTMLElement;

function createResponse(): HTTPResponse {
  const code = RESPONSE_NUMBERS[Math.floor(Math.random() * 4)];
  const content = RESPONSE_CONTENT[Math.floor(Math.random() * 4)];
  const article = RESPONSE_ARTICLE[Math.floor(Math.random() * 4)];
  return {
    code: code,
    content: content,
    article: article,
  };
}

const HTTPResponseFactory = new HTTPWebResponse(
  new ContentWebPageResponse(userContent, userArticle),
  new SecurityWebPageResponse(userContent, userArticle),
  userContent,
  userArticle
);

requestButton.addEventListener("click", () => {
  const response = createResponse();
  const webPage = HTTPResponseFactory.createWebPage(response);
  webPage.display();
  let responseString = "";
  let responseContent = "";
  let responseArticle = "";
  switch (response.code) {
    case 404:
      responseString = "Not Found";
      responseContent = "Default Page";
      responseArticle = "Default Page";
      break;
    case 200:
      responseString = "OK";
      responseContent = response.content!;
      responseArticle = response.article!;
      break;
    case 503:
      responseString = "Service Unavailable";
      responseContent = response.content!;
      responseArticle = response.article!;
      break;
    case 511:
      responseString = "Network Authentication Required";
      responseContent = "CANNOT CONNECT";
      responseArticle = "CANNOT CONNECT";
      break;
  }

  serverResponse.innerHTML = response.code.toString() + "<br>" + responseString;
  if (response.code === 503) {
    clientResponse.innerHTML = `<h5>STATUS:</h5> CLIENT ISSUE LOGGED <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
  } else if (response.code === 511) {
    clientResponse.innerHTML = `<h5>STATUS:</h5> SECURITY ISSUE LOGGED <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
  } else if (response.code === 404) {
    clientResponse.innerHTML = `<h5>STATUS:</h5> CONTENT NOT FOUND <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
  } else {
    clientResponse.innerHTML = `<h5>STATUS:</h5> OK <br><br> <h5>CONTENT:</h5> ${responseContent} <br><br> <h5>ARTICLE:</h5> ${responseArticle}`;
  }
});
