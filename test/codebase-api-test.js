var apiTester = require('./api-crud-executor.js');

apiTester({
        name: 'CodebaseAPI',
        baseurl: 'http://localhost:3000',
        baseapi: '/api/codebase',
        resCacheData: [],
        resCacheKeys: function (response) {
            return {'id': response.id, 'name': response.name};
        },
        typeMatch: {
            id: {type: 'Number', required: true},
            org: {type: 'String', required: true},
            name: {type: 'String', required: true},
            strategy: {type: 'String', required: false},
            score: {type: 'String', required: false}
        },
        create: function () {
            return [
                {send: {org: 'Federal', name: 'rest-proxy'}},
                {send: {org: 'Federal', name: 'storage-server'}},
                {send: {org: 'State', name: 'front-end'}},
                {send: {org: 'State', name: 'charting-toolbox'}},
                {send: {org: 'State', name: 'content-publishing'}}
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
                strategy: "reduce"
            };
        },
        update: function () {
            return {
                id: this.resCacheData[0].id,
                org: "another",
                name: "override",
                strategy: "strategic"
            };
        },
        delete: function () {
            return this.resCacheData;
        }
    }
);

