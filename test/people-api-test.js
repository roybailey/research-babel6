var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var supertest = require('supertest');

var api = supertest('http://localhost:3000');

var logRequest = function (req) {
    console.log("> "+req);
    return req;
};
var logResponse = function (res) {
    console.log("< "+res.status);
    //console.log(JSON.stringify(res.headers));
    console.log(res.body);
};

var jsonInput = {
    name: "mocha"
};

describe('POST /people', function () {
    it('should create new record', function (done) {

        api.post(logRequest('/people'))
            .set('Accept', 'application/json')
            .send(jsonInput)
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);
                expect(res.body.id).to.be.a('number');
                expect(res.body.name).to.be.a('string');
                expect(res.body.name).to.equal(jsonInput.name);
                jsonInput.id = res.body.id;
                done();
            });

    });
});

describe('GET /people/{id}', function () {
    it('should respond with json', function (done) {

        api.get(logRequest('/people/' + jsonInput.id))
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);
                done();
            });

    });
});

describe('GET /people', function () {
    it('should respond with json', function (done) {

        api.get(logRequest('/people'))
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                logResponse(res);
                expect(res.body).to.be.instanceof(Array);
                res.body.should.contain.an.item.with.property('name', 'mocha');
                done();
            });

    });
});

