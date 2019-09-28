const endpoint = require('config');
const service = endpoint.get('service');
const baseUrl = service.baseUrl;
const token = service.token;
const fetch = require("node-fetch");
const https = require("https");
const agent = new https.Agent({
    rejectUnauthorized: false
})


let get = (url) => {
    let options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        agent
    };
    return fetch(baseUrl + url, options)
        .then(response => {
            return response;
        });
};

let postUpload = (url, request) => {
    let options = {
        method: 'POST',
        body: JSON.stringify(request),
        headers: {
            'Content-Type': 'application/json'
        },       
        credentials: 'same-origin',
        agent
    }
    return fetch(baseUrl + url, options)
        .then(response => {
            return response;
        });
}

global.get = get;
global.token = token;
global.postUpload = postUpload;