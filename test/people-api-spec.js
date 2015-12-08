var frisby = require('frisby');

frisby.create('Get All People')
    .get('http://localhost:3000/people')
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

frisby.create('Get Single Person')
    .get('http://localhost:3000/people/212')
    .inspectHeaders()
    .inspectJSON()
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes({
        name: String
    })
    .expectJSON({
        name: "Carl"
    })
    .toss();

frisby.create('Create a new Person')
    .post('http://localhost:3000/people', {
        name: 'Frisby'
    }, {json: true})
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
        // get newly created person...
        frisby.create('Get Newly Created Person ' + json.name)
            .get('http://localhost:3000/people/' + json.id)
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
                // delete newly created person
                frisby.create('Delete Newly Created Person ' + json.name)
                    .delete('http://localhost:3000/people/' + json.id)
                    .inspectHeaders()
                    .inspectJSON()
                    .expectStatus(200)
                    .toss()
            })
            .toss();
    })
    .toss();

