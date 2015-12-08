var frisby = require('frisby');
var BASEURL = 'http://localhost:3000/people/';

var crudTesting = require('./api-crud.js')(BASEURL);

//crudTesting.createPerson(
//    { name: 'Frisby' },
//    [crudTesting.getPerson, crudTesting.deletePerson, crudTesting.findPerson]
//);

crudTesting.test(
    "Person",
    {
        id: Number,
        name: String
    },
    {
        name: 'Frisby'
    }
);


