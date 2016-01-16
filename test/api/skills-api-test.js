var apiTester = require('./api-crud-executor.js');

apiTester({
        name: 'SkillsAPI',
        baseurl: 'http://localhost:3000',
        baseapi: '/api/skills',
        resCacheData: [],
        resCacheKeys: function (response) {
            return {'id': response.id, 'name': response.name};
        },
        typeMatch: {
            id: {type: 'Number', required: true},
            name: {type: 'String', required: true},
            strategy: {type: 'String', required: false}
        },
        create: function () {
            return [
                {send: {name: 'C++'}},
                {send: {name: 'Java'}},
                {send: {name: 'JavaScript'}},
                {send: {name: 'Web'}},
                {send: {name: 'Flex'}},
                {send: {name: 'Mobile'}}
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
                name: "override",
                strategy: "review"
            };
        },
        delete: function () {
            return this.resCacheData;
        }
    }
);

