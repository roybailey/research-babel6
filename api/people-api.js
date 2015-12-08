'use strict';
import Neo4j from 'rainbird-neo4j';

class PeopleAPI {


    constructor(db) {
        this.db = db;
        // test out connectivity...
        this.find(null, (err, data)=> {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
            }
            else {
                console.log(JSON.stringify(data, null, 2));
            }
        });
    }


    log(action, data, params) {
        console.log("---------- " + action);
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(params));
        console.log("----------");
    }


    decoder(results) {
        var response = [];
        results[0].forEach((row)=> {
            response.push({
                id: row.id,
                name: row.name
            });
        });
        return response;
    }

    // Return all records
    find(params, callback) {

        this.log("findPerson", null, params);
        let QUERY = `
        MATCH (person:Resource)
        RETURN id(person) as id, person.name as name
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                callback(null, this.decoder(results));
            }
        });
    }


    // Gets a single record by id
    get(id, params, callback) {

        this.log("getPerson", id, params);
        let QUERY = `
        MATCH (person:Resource)
        WHERE id(person) = ${id}
        RETURN id(person) as id, person.name as name
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                callback(null, this.decoder(results)[0]);
            }
        });
    }


    // Creates a new record
    create(data, params, callback) {

        this.log("createPerson", data, params);
        let QUERY = `
        MERGE (person:Resource { name: '${data.name}'})
        ON CREATE SET person.created = timestamp()
        RETURN id(person) as id, person.name as name
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                callback(null, this.decoder(results)[0]);
            }
        });
    }


    // Updates (replaces) an existing record with new data
    update(id, data, params, callback) {

        this.log("updatePerson", data, params);
        let QUERY = `
        MERGE (person:Resource { name: '${data.name}'})
        WHERE id(person) == ${data.id}
        SET person.updated = timestamp()
        RETURN id(person) as id, person.name as name
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                callback(null, this.decoder(results)[0]);
            }
        });
    }


    // Extends the data of an existing record
    patch(id, data, params, callback) {

        this.log("patchPerson", data, params);
        let QUERY = `
        MERGE (person:Resource { name: '${data.name}'})
        WHERE id(person) == ${data.id}
        SET person.updated = timestamp()
        RETURN id(person) as id, person.name as name
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                callback(null, this.decoder(results)[0]);
            }
        });
    }


    // Removes an existing record by id
    remove(id, params, callback) {

        this.log("removePerson", id, params);
        let QUERY = `
        MATCH (person:Resource)
        WHERE id(person) = ${id}
        DELETE person
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                callback(null, results);
            }
        });
    }
}

export default PeopleAPI;

