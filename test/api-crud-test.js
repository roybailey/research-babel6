require('./api-crud-executor.js')({
        name: 'PeopleAPI',
        baseurl: 'http://localhost:3000',
        api: '/people',
        post: [
            {
                send: {
                    name: 'mocha'
                },
                typeMatch: {
                    id: 'Number',
                    name: 'String'
                }
            },
            {
                send: {
                    name: 'chai'
                },
                typeMatch: {
                    id: 'Number',
                    name: 'String'
                }
            }
        ],
        jsonSchema: {
            id: 'number',
            name: 'String',
            location: 'String'
        },
        jsonInput: {
            name: 'mocha'
        },
        jsonPatch: {
            name: 'mocha',
            location: 'UK'
        },
        jsonUpdate: {
            name: 'chai',
            location: 'USA'
        }
    }
);

