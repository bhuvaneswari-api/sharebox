var expect = require("chai").expect;
var assert = require("chai").assert;
var fs = require('fs');
var requestJson = {};
var uploadedFileId;
var filePath = './config/data/';
require('./reusableFetchCalls.js');
// require('./commonReusableMethods');

describe("Test Suite for ShareBox APIs", function() {
        it('returns 200 success when all the files in the server are returned', function(done){
                get('/files?&token='+token)
                .then(response => {
                    assert.exists(response);
                    expect(response.status).not.to.equal(401);
                    expect(response.status).to.equal(200);
                    return response.json();
                })
                .then(responseObtained =>{
                    assert.exists(responseObtained);
                    responseObtained.forEach(fileDetails => {
                        assert.exists(fileDetails.name);
                        assert.exists(fileDetails.fileHash);
                        assert.exists(fileDetails.createdOn);
                        assert.exists(fileDetails.bytesCompleted);
                        assert.exists(fileDetails.size);
                        assert.exists(fileDetails.fileId);
                        assert.exists(fileDetails.status);
                    });
                })
                .then(done)
                .catch(done);
        })

        it('returns 200 success when a file is uploaded to the server', function(done){
            let uploadDetails = fs.readFileSync(filePath+'postFiles.json', 'utf8');
            requestJson = JSON.parse(uploadDetails);
            console.log("Printing requestJson: ", requestJson);
            requestJson['size'] = "20";
            console.log("Printing requestJson: ", requestJson);
            postUpload('/upload?&token='+token, requestJson)
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
                uploadedFileId = responseObtained.fileId;
            })
            .then(done)
            .catch(done);
        })
})

