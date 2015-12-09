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


    testSuit.patch = (jsonData, typeCheck, pipeline) => {
        var url = baseurl + jsonData.id;
        console.log(">>> PATCH: " + url);
        // create new person record
        frisby.create('Create a new Resource')
            .patch(url, jsonData, {json: true})
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
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


    testSuit.update = (jsonData, typeCheck, pipeline) => {
        var url = baseurl + jsonData.id;
        console.log(">>> UPDATE: " + url);
        // create new person record
        frisby.create('Update a Resource')
            .put(url, jsonData, {json: true})
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
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

    testSuit.test = function (input) {
        console.log(input.scenario + " Started " + baseurl);
        this.create(input.create.data, input.create.type, (jsonCreated) => {
            this.get(jsonCreated, input.create.type, (jsonFound) => {
                input.patch.data.id = jsonFound.id;
                this.patch(input.patch.data, input.patch.type, () => {
                    input.update.data.id = jsonFound.id;
                    this.update(input.update.data, input.update.type, () => {
                        this.find(input.update.data, input.create.type, () => {
                            this.delete({id: jsonFound.id}, null, () => {
                                console.log(input.scenario + " Done.");
                            });
                        });
                    });
                });
            });
        });
    };

    return testSuit;
};

