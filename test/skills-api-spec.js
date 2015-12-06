var frisby = require('frisby');

frisby.create('Get All Skills')
    .get('http://localhost:3000/skills')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSONTypes('*', {
        name: String,
        score: String
    })
    .expectJSON('?', {
        name: "Ash"
    })
    .toss();
