'use strict';
import Neo4j from 'rainbird-neo4j';

class PeopleAPI {

    static RETURN() { return `
    RETURN  id(person) as id,
            person.name as name,
            person.location as location,
            person.created as created,
            person.updated as updated`
    };

    constructor(db) {
        this.db = db;
        // test out connectivity...
        this.find(null, (err, data)=> {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
            }
            else {
                console.log("PeopleAPI");
                console.log(JSON.stringify(data));
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
                name: row.name,
                location: row.location,
                created: row.created,
                updated: row.updated
            });
        });
        console.log(JSON.stringify(response));
        return response;
    }

    // Return all records
    find(params, callback) {

        this.log("findPerson", null, params);
        let QUERY = `
        MATCH (person:Resource)
        ` +PeopleAPI.RETURN();

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(results.length);
                if(results.length > 1) {
                    console.log(JSON.stringify(results[0])+"..."+JSON.stringify(results[results.length-1]));
                }
                else if(results.length === 1) {
                    console.log(JSON.stringify(results[0]));
                }
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
        ` +PeopleAPI.RETURN();

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
        let PARAMS = {params: data};
        let QUERY = `
        MERGE (person:Resource {name:'${params.name}'})
        ON CREATE SET person += {params}
        ON CREATE SET person.created = timestamp()
        ON MATCH SET person.updated = timestamp()
        ` +PeopleAPI.RETURN();

        this.db.query(QUERY, PARAMS, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results));
                callback(null, this.decoder(results)[0]);
            }
        });
    }


    // Updates (replaces) an existing record with new data
    update(id, data, params, callback) {

        this.log("updatePerson", data, params);
        let QUERY = `
        MATCH (person:Resource)
        WHERE id(person) = {id}
        SET person.name = {name},
            person.location = {location},
            person.updated = timestamp()
        ` +PeopleAPI.RETURN();
        this.db.query(QUERY, data, (err, results) => {
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
        MATCH (person:Resource)
        WHERE id(person) = ${data.id}
        SET person.name = '${data.name}',
            person.location = '${data.location}',
            person.updated = timestamp()
        ` +PeopleAPI.RETURN();

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

