
var jsonSchema = {
    id: 'number',
    name: 'String',
    location: 'String'
};
var jsonInput = {
    name: 'mocha'
};
var jsonPatch = {
    name: 'mocha',
    location: 'UK'
};
var jsonUpdate = {
    name: 'chai',
    location: 'USA'
};

require('./api-crud-executor.js')(
    'http://localhost:3000',
    jsonSchema, jsonInput, jsonPatch, jsonUpdate
);

