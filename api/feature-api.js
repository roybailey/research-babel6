'use strict';
import Neo4j from 'rainbird-neo4j';
import AbstractAPI from './abstract-api.js';

class FeatureAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static RETURN() {
        return `
    RETURN  id(feature) as id,
            feature.name as name,
            feature.strategy as strategy,
            feature.created as created,
            feature.updated as updated`
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
            statement: `MATCH (feature:Feature)` + FeatureAPI.RETURN()
        };
    }


    // Gets a single record by id
    matchCypher(id, params) {
        return {
            statement: `
            MATCH (feature:Feature)
            WHERE id(feature) = ${id}`
            + FeatureAPI.RETURN()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        return {
            statement: `
            MERGE (feature:Feature {name:'${params.name}'})
            ON CREATE SET feature += {params}
            ON CREATE SET feature.created = timestamp()
            ON MATCH SET feature.updated = timestamp()`
            + FeatureAPI.RETURN(),
            parameters: {params: data}
        };
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        return {
            statement: `
            MATCH (feature:Feature)
            WHERE id(feature) = {id}
            SET feature.name = {name},
                feature.strategy = {strategy},
                feature.updated = timestamp()`
            + FeatureAPI.RETURN(),
            parameters: data
        };
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        return {
            statement: `
            MATCH (feature:Feature)
            WHERE id(feature) = ${data.id}
            SET feature.name = '${data.name}',
                feature.strategy = '${data.strategy}',
                feature.updated = timestamp()`
            + FeatureAPI.RETURN()
        };
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        return {
            statement: `
            MATCH (feature:Feature)
            WHERE id(feature) = ${id}
            DELETE feature`
        };
    }
}

export default FeatureAPI;

