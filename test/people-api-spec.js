var frisby = require('frisby');
var BASEURL = 'http://localhost:3000/people/';

var crudTesting = require('./api-crud.js')(BASEURL);

crudTesting.test({
    scenario: "Person",
    create: {
        data: {
            name: 'Frisby'
        },
        type: {
            id: Number,
            name: String,
            location: function(val) { expect(val).toBeTypeOrNull(String); }
        }
    },
    patch: {
        data: {
            name: 'Frisby',
            location: 'UK'
        },
        type: {
            id: Number,
            name: String,
            location: String
        }
    },
    update: {
        data: {
            name: 'Frisby2'
        },
        type: {
            id: Number,
            name: String
        }
    }
});


