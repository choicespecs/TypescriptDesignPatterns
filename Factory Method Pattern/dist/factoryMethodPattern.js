"use strict";
const RESPONSE_NUMBERS = [404, 200, 503, 511];
const requestButton = document.querySelector(".requestButton");
const serverResponse = document.querySelector(".server.response");
addEventListener("click", () => {
    const response = RESPONSE_NUMBERS[Math.floor(Math.random() * (4))];
    let responseString = "";
    switch (response) {
        case 404:
            responseString = "Not Found";
            break;
        case 200:
            responseString = "OK";
            break;
        case 503:
            responseString = "Service Unavailable";
            break;
        case 511:
            responseString = "Network Authentication Required";
            break;
    }
    serverResponse.innerHTML = response.toString() + "<br>" + responseString;
});
