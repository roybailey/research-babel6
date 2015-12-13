var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var supertest = require('supertest');

module.exports = function (spec) {

    var api = supertest(spec.baseurl);

    logRequest = function (req) {
        console.log("> " + req);
        return req;
    };
    logResponse = function (res) {
        console.log("< " + res.status);
        console.log(res.body);
    };


    describe(spec.name, function () {

        it.only(`POST ${spec.api} should create new resource from input data`, function (done) {

            spec.post.forEach(function (entry) {
                api.post(logRequest(spec.api))
                    .set('Accept', 'application/json')
                    .send(entry.send)
                    .expect(201)
                    .end(function (err, res) {
                        if (err) return done(err);
                        logResponse(res);

                        // validate the response data types...
                        for (var property in entry.typeMatch) {
                            if (entry.typeMatch.hasOwnProperty(property)) {
                                console.log(`Checking ${res.body[property]} is type ${entry.typeMatch[property].toLowerCase()}`);
                                (res.body).should.contain.key(property);
                                (res.body[property]).should.be.a(entry.typeMatch[property]);
                            }
                        }

                        // validate the response data values...
                        if(typeof entry.dataMatch === 'function') {
                            console.log("Checking response against custom function");
                            (entry.dataMatch(res.body)).should.equal(true);
                        } else if(typeof entry.dataMatch === 'object') {
                            console.log("Checking response against custom object");
                            (res.body).should.contain(entry.dataMatch);
                        } else {
                            console.log("Checking response against input");
                            (res.body).should.contain(entry.send);
                        }

                        send.id = res.body.id;
                    });
            });
            done();
        });


        it(`GET ${spec.api}/{id} should find resource and respond with json`, function (done) {

            api.get(logRequest(`${spec.api}/${spec.jsonInput.id}`))
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    logResponse(res);

                    (res.body).should.contain.keys(['id', 'name']);
                    (res.body.id).should.be.a(spec.jsonSchema.id);
                    (res.body.name).should.be.a(spec.jsonSchema.name);
                    (res.body.name).should.equal(spec.jsonInput.name);
                    (res.body).should.contain(spec.jsonInput);

                    done();
                });

        });


        it(`GET ${spec.api} should find all resources and respond with json array`, function (done) {

            api.get(logRequest(spec.api))
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    logResponse(res);

                    (res.body).should.be.instanceof(Array);
                    (res.body).should.contain.an.item(spec.jsonInput);
                    (res.body).should.contain.an.item.with.property('id', spec.jsonInput.id);
                    (res.body).should.contain.an.item.with.property('name', spec.jsonInput.name);

                    done();
                });

        });


        it(`PATCH ${spec.api}/{id} should perform partial update of record`, function (done) {

            spec.jsonPatch.id = spec.jsonInput.id;
            api.patch(logRequest(`${spec.api}/${spec.jsonInput.id}`))
                .send(spec.jsonPatch)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    logResponse(res);

                    (res.body).should.contain.keys(['id', 'name', 'location']);
                    (res.body.id).should.be.a(spec.jsonSchema.id);
                    (res.body.name).should.be.a(spec.jsonSchema.name);
                    (res.body.name).should.equal(spec.jsonInput.name);
                    (res.body.location).should.equal(spec.jsonPatch.location);
                    (res.body).should.contain(spec.jsonPatch);

                    done();
                });

        });


        it(`PUT ${spec.api}/{id} should perform full replacement of record`, function (done) {

            spec.jsonUpdate.id = spec.jsonInput.id;
            api.put(logRequest(`${spec.api}/${spec.jsonInput.id}`))
                .send(spec.jsonUpdate)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    logResponse(res);

                    (res.body).should.contain.keys(['id', 'name', 'location']);
                    (res.body.id).should.be.a(spec.jsonSchema.id);
                    (res.body.name).should.be.a(spec.jsonSchema.name);
                    (res.body.id).should.equal(spec.jsonUpdate.id);
                    (res.body.name).should.equal(spec.jsonUpdate.name);
                    (res.body.location).should.equal(spec.jsonUpdate.location);
                    (res.body).should.contain(spec.jsonUpdate);

                    done();
                });

        });


        it(`DELETE ${spec.api}/{id} should delete record`, function (done) {

            api.delete(logRequest(`${spec.api}/${spec.jsonInput.id}`))
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (err) return done(err);
                    logResponse(res);
                    done();
                });

        });


        it('should no longer find the record', function (done) {

            api.get(logRequest(`${spec.api}/${spec.jsonInput.id}`))
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
