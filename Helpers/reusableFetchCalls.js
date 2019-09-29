const endpoint = require('config');
const service = endpoint.get('service');
const baseUrl = service.baseUrl;
const tokenUser1 = service.tokenUser1;
const tokenUser2 = service.tokenUser2;
const fetch = require("node-fetch");
const https = require("https");
const agent = new https.Agent({
    rejectUnauthorized: false
})


let get = (url, request) => {
    let options = {
        method: 'GET',
        body: JSON.stringify(request),
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

let post = (url, request) => {
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

let put = (url, request) => {
    let options = {
        method: 'PUT',
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

let del = (url, request) => {
    let options = {
        method: 'DELETE',
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
global.post = post;
global.put = put;
global.del = del;
global.tokenUser1 = tokenUser1;
global.tokenUser2 = tokenUser2;
