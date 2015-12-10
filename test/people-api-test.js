var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var supertest = require('supertest');

var api = supertest('http://localhost:3000');

var logRequest = function (req) {
    console.log("> " + req);
    return req;
};
var logResponse = function (res) {
    console.log("< " + res.status);
    //console.log(JSON.stringify(res.headers));
    console.log(res.body);
};

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

describe('POST /people', function () {
    it('should create new resource record from input data', function (done) {

        api.post(logRequest('/people'))
            .set('Accept', 'application/json')
            .send(jsonInput)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);

                (res.body).should.contain.keys(['id', 'name']);
                (res.body.id).should.be.a(jsonSchema.id);
                (res.body.name).should.be.a(jsonSchema.name);
                (res.body.name).should.equal(jsonInput.name);
                (res.body).should.contain(jsonInput);

                jsonInput.id = res.body.id;
                done();
            });

    });
});

describe('GET /people/{id}', function () {
    it('should find resource and respond with json', function (done) {

        api.get(logRequest('/people/' + jsonInput.id))
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);

                (res.body).should.contain.keys(['id', 'name']);
                (res.body.id).should.be.a(jsonSchema.id);
                (res.body.name).should.be.a(jsonSchema.name);
                (res.body.name).should.equal(jsonInput.name);
                (res.body).should.contain(jsonInput);

                done();
            });

    });
});

describe('GET /people', function () {
    it('should find all resources and respond with json array', function (done) {

        api.get(logRequest('/people'))
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);

                (res.body).should.be.instanceof(Array);
                (res.body).should.contain.an.item(jsonInput);
                (res.body).should.contain.an.item.with.property('id', jsonInput.id);
                (res.body).should.contain.an.item.with.property('name', jsonInput.name);

                done();
            });

    });
});

describe('PATCH /people/{id}', function () {

    it('should perform partial update of record', function (done) {

        jsonPatch.id = jsonInput.id;
        api.patch(logRequest('/people/' + jsonInput.id))
            .send(jsonPatch)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);

                (res.body).should.contain.keys(['id', 'name', 'location']);
                (res.body.id).should.be.a(jsonSchema.id);
                (res.body.name).should.be.a(jsonSchema.name);
                (res.body.name).should.equal(jsonInput.name);
                (res.body.location).should.equal(jsonPatch.location);
                (res.body).should.contain(jsonPatch);

                done();
            });

    });

});

describe('PUT /people/{id}', function () {

    it('should perform full replacement of record', function (done) {

        jsonUpdate.id = jsonInput.id;
        api.put(logRequest('/people/' + jsonInput.id))
            .send(jsonUpdate)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);

                (res.body).should.contain.keys(['id', 'name', 'location']);
                (res.body.id).should.be.a(jsonSchema.id);
                (res.body.name).should.be.a(jsonSchema.name);
                (res.body.id).should.equal(jsonUpdate.id);
                (res.body.name).should.equal(jsonUpdate.name);
                (res.body.location).should.equal(jsonUpdate.location);
                (res.body).should.contain(jsonUpdate);

                done();
            });

    });

});

describe('DELETE /people/{id}', function () {

    it('should delete record', function (done) {

        api.delete(logRequest('/people/' + jsonInput.id))
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);
                done();
            });

    });

    it('should no longer find the record', function (done) {

        api.get(logRequest('/people/' + jsonInput.id))
            .set('Accept', 'application/json')
            .expect(204)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);
                done();
            });

    });
});
