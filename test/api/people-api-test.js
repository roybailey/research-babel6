var apiTester = require('./api-crud-executor.js');

apiTester({
        name: 'PeopleAPI',
        baseurl: 'http://localhost:3000',
        baseapi: '/api/people',
        resCacheData: [],
        resCacheKeys: function (response) {
            return {'id': response.id, 'name': response.name};
        },
        typeMatch: {
            id: {type: 'Number', required: true},
            name: {type: 'String', required: true},
            role: {type: 'String', required: false}
        },
        create: function () {
            return [
                {send: {name: 'mocha'}},
                {send: {name: 'chai'}},
                {send: {name: 'javascript'}},
                {send: {name: 'superagent'}},
                {send: {name: 'require'}}
            ]
        },
        find: function () {
            return [
                this.resCacheData[0],
                this.resCacheData[Math.floor(this.resCacheData.length / 2)],
                this.resCacheData[this.resCacheData.length - 1]
            ];
        },
        patch: function () {
            return {
                id: this.resCacheData[0].id,
                name: this.resCacheData[0].name,
                role: "QA"
            };
        },
        update: function () {
            return {
                id: this.resCacheData[0].id,
                name: "override",
                role: "Dev"
            };
        },
        delete: function () {
            return this.resCacheData;
        }
    }
);

