var chai = require("chai");
chai.should();
chai.use(require('chai-things'));
var expect = chai.expect;
var supertest = require('supertest');

module.exports = function (spec) {

    var request = supertest(spec.baseurl);

    logRequest = function (req, data) {
        console.log("> " + req + " > " + JSON.stringify(data));
        return req;
    };
    logResponse = function (err, res) {
        if (err) {
            console.log("< " + err);
        } else {
            console.log("< " + res.status);
            console.log(res.body);
        }
        return err;
    };
    assertSchema = function (typeMatch, record) {
        // validate the response data types...
        for (var property in typeMatch) {
            if (typeMatch.hasOwnProperty(property)) {
                console.log(`Checking ${record[property]} is type ${typeMatch[property].toLowerCase()}`);
                (record).should.contain.key(property);
                (record[property]).should.be.a(typeMatch[property]);
            }
        }
    };

    describe(spec.name, function () {

        it(`POST ${spec.baseapi} should create new resource from input data`, function (done) {

            var dataset = spec.post();
            var count = 0;
            dataset.forEach(function (entry) {
                request.post(logRequest(spec.baseapi, entry.send))
                    .set('Accept', 'application/json')
                    .send(entry.send)
                    .expect(201)
                    .end(function (err, res) {
                        if (logResponse(err, res))
                            return done(err);

                        // validate the response data types...
                        var typeMatch = entry.typeMatch || spec.typeMatch;
                        assertSchema(typeMatch, res.body);

                        // validate the response data values...
                        var dataMatch = entry.dataMatch || spec.dataMatch;
                        if (typeof dataMatch === 'function') {
                            console.log("Checking response against custom function");
                            (dataMatch(res.body)).should.equal(true);
                        } else if (typeof dataMatch === 'object') {
                            console.log("Checking response against custom object");
                            (res.body).should.contain(dataMatch);
                        } else {
                            console.log("Checking response against input");
                            (res.body).should.contain(entry.send);
                        }

                        // capture the response cache fields...
                        spec.resCacheData.push(spec.resCacheKeys(res.body));
                        if (++count === dataset.length) {
                            console.log("Cached: " + JSON.stringify(spec.resCacheData));
                            done();
                        }
                    });
            });
        });


        it(`GET ${spec.baseapi} should find all resources and respond with json array`, function (done) {

            request.get(logRequest(spec.baseapi))
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (logResponse(err, res))
                        return done(err);

                    (res.body).should.be.instanceof(Array);
                    (res.body).forEach(function (record) {
                        assertSchema(spec.typeMatch, record);
                    });

                    var sampleRecords = spec.find();
                    console.log("Checking sample records " + JSON.stringify(sampleRecords));
                    sampleRecords.forEach(function (sample) {
                        (res.body).should.contain.an.item(sample);
                    });

                    done();
                });

        });


        it(`GET ${spec.baseapi}/{id} should find resource and respond with json`, function (done) {

            var count = 0;
            var dataset = spec.resCacheData;
            dataset.forEach(function (entry) {
                request.get(logRequest(`${spec.baseapi}/${entry.id}`))
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (logResponse(err, res))
                            return done(err);

                        assertSchema(spec.typeMatch, res.body);
                        (res.body).should.contain(entry);

                        if (++count === dataset.length) {
                            done();
                        }
                    });
            });
        });


        it(`PATCH ${spec.baseapi}/{id} should perform partial update of record`, function (done) {

            var patchData = spec.patch();
            request.patch(logRequest(`${spec.baseapi}/${patchData.id}`))
                .send(patchData)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (logResponse(err, res))
                        return done(err);

                    assertSchema(spec.typeMatch, res.body);
                    (res.body).should.contain(patchData);

                    done();
                });

        });


        it(`PUT ${spec.api}/{id} should perform full replacement of record`, function (done) {

            var updateData = spec.update();
            request.put(logRequest(`${spec.baseapi}/${updateData.id}`))
                .send(updateData)
                .set('Accept', 'application/json')
                .expect(200)
                .end(function (err, res) {
                    if (logResponse(err, res))
                        return done(err);

                    assertSchema(spec.typeMatch, res.body);
                    (res.body).should.contain(updateData);

                    done();
                });

        });


        it(`DELETE ${spec.baseapi}/{id} should delete record`, function (done) {

            var count = 0;
            var dataset = spec.delete();
            dataset.forEach(function (entry) {
                request.delete(logRequest(`${spec.baseapi}/${entry.id}`))
                    .set('Accept', 'application/json')
                    .expect(200)
                    .end(function (err, res) {
                        if (logResponse(err, res))
                            return done(err);
                        if (++count === dataset.length)
                            done();
                    });
            });
        });


        it('should no longer find the record', function (done) {

            var count = 0;
            var dataset = spec.delete();
            dataset.forEach(function (entry) {
                request.get(logRequest(`${spec.baseapi}/${entry.id}`))
                    .set('Accept', 'application/json')
                    .expect(204)
                    .end(function (err, res) {
                        if (logResponse(err, res))
                            return done(err);
                        if (++count === dataset.length)
                            done();
                    });
            });
        });
    });
};
