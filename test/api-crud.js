var frisby = require('frisby');

module.exports = function (baseurl) {

    var testSuit = {};

    testSuit.findPerson = (json, pipeline) => {
        console.log("---------- find ----------");
        frisby.create('Get All People')
            .get(baseurl)
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes('*', {
                id: Number,
                name: String
            })
            .expectJSON('?', {
                name: "Ash"
            })
            .toss();
    };


    testSuit.createPerson = (json, pipeline) => {
        console.log("---------- create ----------");
        // create new person record
        frisby.create('Create a new Person')
            .post(baseurl, json, {json: true})
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(201)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes({
                id: Number,
                name: String
            })
            .expectJSON({
                name: "Frisby"
            })
            .afterJSON(function (json) {
                console.log(json);
                pipeline[0](json, pipeline.slice(1));
            })
            .toss();
    };


    testSuit.getPerson = (json, pipeline) => {
        console.log("---------- get ----------");
        // get newly created person...
        frisby.create('Get Newly Created Person ' + json.name)
            .get(baseurl + json.id)
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSONTypes({
                id: Number,
                name: String
            })
            .expectJSON({
                name: "Frisby"
            })
            .afterJSON(function (json) {
                console.log(json);
                pipeline[0](json, pipeline.slice(1));
            })
            .toss();
    };

    testSuit.deletePerson = function(json, pipeline) {
        console.log("---------- delete ----------");
        // delete newly created person
        frisby.create('Delete Newly Created Person ' + json.name)
            .delete(baseurl + json.id)
            .inspectHeaders()
            .inspectJSON()
            .expectStatus(200)
            .afterJSON(function (json) {
                console.log("deleted person");
                if (pipeline[0]) {
                    pipeline[0](json, pipeline.slice(1));
                }
            })
            .toss()
    };

    testSuit.test = function(json) {
        this.createPerson(json, [this.getPerson, this.deletePerson, this.findPerson]);
    };

    return testSuit;
};

