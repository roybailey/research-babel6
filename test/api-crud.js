var frisby = require('frisby');

module.exports = function (baseurl) {

    var testSuit = {};


    testSuit.create = (jsonData, typeCheck, pipeline) => {
        var url = baseurl;
        console.log(">>> CREATE: " + url);
        // create new person record
        frisby.create('Create a new Resource')
            .post(url, jsonData, {json: true})
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(201)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes(typeCheck)
            .expectJSON(jsonData)
            .afterJSON(function (jsonResponse) {
                if (pipeline) {
                    pipeline(jsonResponse);
                }
            })
            .toss();
    };


    testSuit.get = (jsonData, typeChecks, pipeline) => {
        var url = baseurl + jsonData.id;
        console.log(">>> GET: " + url);
        // get newly created person...
        frisby.create('Get Newly Created Resource ' + json.id)
            .get(url)
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes(typeChecks)
            .expectJSON(jsonData)
            .afterJSON(function (jsonResponse) {
                if (pipeline) {
                    pipeline(jsonResponse);
                }
            })
            .toss();
    };


    testSuit.find = (jsonData, typeChecks, pipeline) => {
        var url = baseurl;
        console.log(">>> FIND: " + url);
        frisby.create('Get All Resources')
            .get(url)
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes('*', typeChecks)
            .expectJSON('?', jsonData)
            .afterJSON(function (jsonResponse) {
                if (pipeline) {
                    pipeline(jsonResponse);
                }
            })
            .toss();
    };


    testSuit.delete = (jsonData, typeChecks, pipeline) => {
        var url = baseurl + jsonData.id;
        console.log(">>> DELETE: " + url);
        // delete newly created resource
        frisby.create('Delete Newly Created Person ' + json.name)
            .delete(url)
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
            .afterJSON(function (jsonResponse) {
                if (pipeline) {
                    pipeline(jsonResponse);
                }
            })
            .toss()
    };

    testSuit.test = function (name, typeCheck, jsonData) {

        this.create(jsonData, typeCheck, (jsonCreated) => {
            this.get(jsonCreated, typeCheck, (jsonFound) => {
                this.find(jsonFound, typeCheck, () => {
                    this.delete(jsonFound, null, () => {
                        console.log(name + " Done.");
                    });
                });
            });
        });
    };

    return testSuit;
};

