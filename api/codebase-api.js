'use strict';
import Neo4j from 'rainbird-neo4j';
import AbstractAPI from './abstract-api.js';

class CodebaseAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static RETURN() {
        return `
    RETURN  id(codebase) as id,
            codebase.org as org,
            codebase.name as name,
            codebase.strategy as strategy,
            codebase.created as created,
            codebase.updated as updated`
    }


    decodeRow(row) {
        return {
            id: row.id,
            org: row.org,
            name: row.name,
            strategy: row.strategy,
            created: row.created,
            updated: row.updated
        };
    }


    // Return all records
    findCypher(params) {
        return {
            statement: `MATCH (codebase:Codebase)` + CodebaseAPI.RETURN()
        };
    }


    // Return all records
    matchCypher(id, params) {
        return {
            statement: `MATCH (codebase:Codebase) WHERE id(codebase) = ${id}`
            + CodebaseAPI.RETURN()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        return {
            statement: `
            MERGE (codebase:Codebase {name:'${params.name}'})
            ON CREATE SET codebase += {params}
            ON CREATE SET codebase.created = timestamp()
            ON MATCH SET codebase.updated = timestamp()`
            + CodebaseAPI.RETURN(),
            parameters: {params: data}
        };
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        return {
            statement: `
            MATCH (codebase:Codebase)
            WHERE id(codebase) = {id}
            SET codebase.org = {org},
                codebase.name = {name},
                codebase.strategy = {strategy},
                codebase.updated = timestamp()`
            + CodebaseAPI.RETURN(),
            parameters: data
        }
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        return {
            statement: `
            MATCH (codebase:Codebase)
            WHERE id(codebase) = ${data.id}
            SET codebase.org = '${data.org}',
                codebase.name = '${data.name}',
                codebase.strategy = '${data.strategy}',
                codebase.updated = timestamp()`
            + CodebaseAPI.RETURN()
        };
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        return {
            statement: `
            MATCH (codebase:Codebase)
            WHERE id(codebase) = ${id}
            DELETE codebase`
        };
    }
}

export default CodebaseAPI;

