var frisby = require('frisby');
var BASEURL = 'http://localhost:3000/people/';

var crudTesting = require('./api-crud.js')(BASEURL);

crudTesting.test({ name: 'Frisby' });
