var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var supertest = require('supertest');

module.exports = function (baseurl, jsonSchema, jsonInput, jsonPatch, jsonUpdate) {

    var api = supertest(baseurl);

    logRequest = function (req) {
        console.log("> " + req);
        return req;
    };
    logResponse = function (res) {
        console.log("< " + res.status);
        console.log(res.body);
    };


    describe('PeopleAPI', function () {

        it('POST /people should create new resource from input data', function (done) {

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


        it('GET /people/{id} should find resource and respond with json', function (done) {

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


        it('GET /people should find all resources and respond with json array', function (done) {

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


        it('PATCH /people/{id} should perform partial update of record', function (done) {

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


        it('PUT /people/{id} should perform full replacement of record', function (done) {

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


        it('DELETE /people/{id} should delete record', function (done) {

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
};
