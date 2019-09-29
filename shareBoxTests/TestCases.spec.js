require('../Helpers/reusableFetchCalls.js');
var expect = require("chai").expect;
var assert = require("chai").assert;
var fs = require('fs');
var requestJson = {}, randomFileDetails = {}, fileIdList = [], fileNameList = [],
fileHashList = [], fileSizeList = [], bytesCompletedList = [], fileStatusList = [],
fileCreatedOnList = [], assertionText, indexToRead, updatedBytesCompleted;
var randomNumber = Math.floor(Math.random() * 100000);
var filePath = './config/data/';


describe("Test Suite for ShareBox APIs", function () {

    it('returns 200 success when a file is uploaded to the server', function (done) {
        let uploadDetails = fs.readFileSync(filePath + 'postFiles.json', 'utf8');
        requestJson = JSON.parse(uploadDetails);
        requestJson['name'] = requestJson.name + randomNumber.toString();
        requestJson['hash'] = requestJson.hash + randomNumber.toString();
        requestJson['size'] = randomNumber.toString();
        post('/upload?&token=' + tokenUser1, requestJson)
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(200);
                return response.json();
            })
            .then(responseObtained => {
                assert.exists(responseObtained);
                assert.exists(responseObtained.secretKey);
                assert.exists(responseObtained.accessKey);
                assert.exists(responseObtained.sessionToken);
                assert.exists(responseObtained.fileId);
            })
            .then(done)
            .catch(done);
    })

    it('returns 200 success when all the files in the server are returned', function (done) {
        get('/files?&token=' + tokenUser1)
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(200);
                return response.json();
            })
            .then(responseObtained => {
                assert.exists(responseObtained);
                responseObtained.forEach(fileDetails => {
                    assert.exists(fileDetails.name);
                    assert.exists(fileDetails.fileHash);
                    assert.exists(fileDetails.createdOn);
                    assert.exists(fileDetails.bytesCompleted);
                    assert.exists(fileDetails.size);
                    assert.exists(fileDetails.fileId);
                    assert.exists(fileDetails.status);
                    fileNameList.push(fileDetails.name);
                    fileHashList.push(fileDetails.fileHash);
                    bytesCompletedList.push(fileDetails.bytesCompleted);
                    fileSizeList.push(fileDetails.size);
                    fileStatusList.push(fileDetails.status);
                    fileCreatedOnList.push(fileDetails.createdOn);
                    fileIdList.push(fileDetails.fileId);
                });
                indexToRead = Math.floor(Math.random()*fileIdList.length);
                randomFileDetails['name'] = fileNameList[indexToRead];
                randomFileDetails['fileHash'] = fileHashList[indexToRead];
                randomFileDetails['createdOn'] = fileCreatedOnList[indexToRead];
                randomFileDetails['bytesCompleted'] = bytesCompletedList[indexToRead];
                randomFileDetails['size'] = fileSizeList[indexToRead];
                randomFileDetails['fileId'] = fileIdList[indexToRead];
                randomFileDetails['status'] = fileStatusList[indexToRead];
            })
            .then(done)
            .catch(done);
    })

    it('returns 200 success when bytes has been updated in a random file uploaded previously', function(done) {
        assertionText = 'Bytes has been updated successfully';
        let editDetails = fs.readFileSync(filePath + 'putFiles.json', 'utf8');
        requestJson = JSON.parse(editDetails);
        requestJson['fileId'] = randomFileDetails['fileId'];
        if(randomFileDetails['bytesCompleted'] == 0){
            requestJson['bytesCompleted'] = 1;
        }
        updatedBytesCompleted = requestJson['bytesCompleted'];
        put('/upload?&token=' + tokenUser1, requestJson) 
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(200);
                return response.json();
            })
            .then(responseObtained => {
                assert.exists(responseObtained);
                expect(responseObtained.message).to.equal(assertionText) 
            })
            .then(done)
            .catch(done);
    })

    it('returns 200 success when a random file details are retrieved from server', function(done) {
        get('/upload?&token=' + tokenUser1+'&fileId='+randomFileDetails['fileId'])
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(200);
                return response.json();
            })
            .then(responseObtained => {
                assert.exists(responseObtained);
                expect(responseObtained.status).to.equal(randomFileDetails['status']);
                expect(responseObtained.name).to.equal(randomFileDetails['name']);
                expect(responseObtained.fileHash).to.equal(randomFileDetails['fileHash']);
                expect(responseObtained.createdOn).to.equal(randomFileDetails['createdOn']);
                expect(responseObtained.bytesCompleted).not.to.equal(randomFileDetails['bytesCompleted']);
                expect(responseObtained.bytesCompleted).to.equal(updatedBytesCompleted);
                expect(responseObtained.size).to.equal(randomFileDetails['size']);
                expect(responseObtained.fileId).to.equal(randomFileDetails['fileId']);
            })
            .then(done)
            .catch(done);
    })

    it('returns 200 success when file is shared to an another user', function(done) {
        assertionText = 'Successfully Shared';
        let shareToDetails = fs.readFileSync(filePath + 'postShareTo.json', 'utf8');
        requestJson = JSON.parse(shareToDetails);
        requestJson['fileId'] = randomFileDetails['fileId'];
        post('/files?&token=' + tokenUser1, requestJson)
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(200);
                return response.json();
            })
            .then(responseObtained => {
                assert.exists(responseObtained);
                expect(responseObtained.message).to.equal(assertionText) 
            })
            .then(done)
            .catch(done);
    })

    it('returns 404 when the file shared is accepted by the same user', function(done) {
        let fileacceptDetails = fs.readFileSync(filePath + 'putToAcceptFile.json', 'utf8');
        requestJson = JSON.parse(fileacceptDetails);
        requestJson['fileId'] = randomFileDetails['fileId'];
        put('/files?&token=' + tokenUser1, requestJson) 
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(404);
            }) 
            .then(done)
            .catch(done);
    })

    it('returns 200 when the file shared is accepted by the another user', function(done) {
        let fileacceptDetails = fs.readFileSync(filePath + 'putToAcceptFile.json', 'utf8');
        requestJson = JSON.parse(fileacceptDetails);
        requestJson['fileId'] = randomFileDetails['fileId'];
        put('/files?&token=' + tokenUser2, requestJson) 
            .then(response => {
                assert.exists(response);
                expect(response.status).not.to.equal(401);
                expect(response.status).to.equal(200);
                return response.json();
            }) 
            .then(responseObtained => {
                assert.exists(responseObtained);
            })
            .then(done)
            .catch(done);
    })

    it('returns 200 success when a fle from server is deleted', function(done) {
        assertionText = 'File deleted successfully';
        requestJson['fileId'] = randomFileDetails['fileId'];
        del('/files?&token=' + tokenUser1, requestJson)
         .then(response => {
            assert.exists(response);
            expect(response.status).not.to.equal(401);
            expect(response.status).to.equal(200);
            return response.json();
         })
         .then(responseObtained => {
            assert.exists(responseObtained);
            expect(responseObtained.message).to.equal(assertionText) 
         })
         .then(done)
         .catch(done);
    })
})

