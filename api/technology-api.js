'use strict';
import Neo4j from 'rainbird-neo4j';
import AbstractAPI from './abstract-api.js';

class TechnologyAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static RETURN() {
        return `
        RETURN  id(technology) as id,
                technology.name as name,
                technology.strategy as strategy,
                technology.created as created,
                technology.updated as updated`
    }


    decodeRow(row) {
        return {
            id: row.id,
            name: row.name,
            strategy: row.strategy,
            created: row.created,
            updated: row.updated
        };
    }


    // Return all records
    findCypher(params) {
        return {
            statement: `MATCH (technology:Technology)` + TechnologyAPI.RETURN()
        };
    }


    // Gets a single record by id
    matchCypher(id, params) {
        return {
            statement: `
            MATCH (technology:Technology)
            WHERE id(technology) = ${id}`
            + TechnologyAPI.RETURN()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        return {
            statement: `
            MERGE (technology:Technology {name:'${params.name}'})
            ON CREATE SET technology += {params}
            ON CREATE SET technology.created = timestamp()
            ON MATCH SET technology.updated = timestamp()`
            + TechnologyAPI.RETURN(),
            parameters: {params: data}
        };
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        return {
            statement: `
            MATCH (technology:Technology)
            WHERE id(technology) = {id}
            SET technology.name = {name},
                technology.strategy = {strategy},
                technology.updated = timestamp()`
            + TechnologyAPI.RETURN(),
            parameters: data
        };
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        return {
            statement: `
            MATCH (technology:Technology)
            WHERE id(technology) = ${data.id}
            SET technology.name = '${data.name}',
                technology.strategy = '${data.strategy}',
                technology.updated = timestamp()`
            + TechnologyAPI.RETURN()
        };
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        return {
            statement: `
            MATCH (technology:Technology)
            WHERE id(technology) = ${id}
            DELETE technology`
        };
    }
}

export default TechnologyAPI;

