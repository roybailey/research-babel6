'use strict';
import Neo4j from 'rainbird-neo4j';
import AbstractAPI from './abstract-api.js';

class PeopleAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static RETURN() {
        return `
    RETURN  id(person) as id,
            person.name as name,
            person.role as role,
            person.created as created,
            person.updated as updated`
    }


    decodeRow(row) {
        return {
            id: row.id,
            name: row.name,
            role: row.role,
            created: row.created,
            updated: row.updated
        };
    }


    // Return all records
    findCypher(params) {
        return {
            statement: `MATCH (person:Person)` + PeopleAPI.RETURN()
        };
    }


    // Gets a single record by id
    matchCypher(id, params) {
        return {
            statement: `
            MATCH (person:Person)
            WHERE id(person) = ${id}`
            + PeopleAPI.RETURN()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        return {
            statement: `
            MERGE (person:Person {name:'${params.name}'})
            ON CREATE SET person += {params}
            ON CREATE SET person.created = timestamp()
            ON MATCH SET person.updated = timestamp()`
            + PeopleAPI.RETURN(),
            parameters: {params: data}
        };
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        return {
            statement: `
            MATCH (person:Person)
            WHERE id(person) = {id}
            SET person.name = {name},
                person.role = {role},
                person.updated = timestamp()`
            + PeopleAPI.RETURN(),
            parameters: data
        };
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        return {
            statement: `
            MATCH (person:Person)
            WHERE id(person) = ${data.id}
            SET person.name = '${data.name}',
                person.role = '${data.role}',
                person.updated = timestamp()`
            + PeopleAPI.RETURN()
        };
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        return {
            statement: `
            MATCH (person:Person)
            WHERE id(person) = ${id}
            DELETE person`
        };
    }
}

export default PeopleAPI;

