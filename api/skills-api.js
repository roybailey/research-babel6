'use strict';
import Neo4j from 'rainbird-neo4j';
import AbstractAPI from './abstract-api.js';

class SkillsAPI extends AbstractAPI {


    constructor(db, apiName) {
        super(db, apiName);
    }


    static RETURN() {
        return `
        RETURN  id(skill) as id,
                skill.name as name,
                skill.strategy as strategy,
                skill.created as created,
                skill.updated as updated`
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
            statement: `MATCH (skill:Skill)` + SkillsAPI.RETURN()
        };
    }


    // Gets a single record by id
    matchCypher(id, params) {
        return {
            statement: `
            MATCH (skill:Skill)
            WHERE id(skill) = ${id}`
            + SkillsAPI.RETURN()
        };
    }


    // Creates a new record
    createCypher(data, params) {
        return {
            statement: `
            MERGE (skill:Skill {name:'${params.name}'})
            ON CREATE SET skill += {params}
            ON CREATE SET skill.created = timestamp()
            ON MATCH SET skill.updated = timestamp()`
            + SkillsAPI.RETURN(),
            parameters: {params: data}
        };
    }


    // Updates (replaces) an existing record with new data
    updateCypher(id, data, params) {
        return {
            statement: `
            MATCH (skill:Skill)
            WHERE id(skill) = {id}
            SET skill.name = {name},
                skill.strategy = {strategy},
                skill.updated = timestamp()`
            + SkillsAPI.RETURN(),
            parameters: data
        };
    }


    // Extends the data of an existing record
    patchCypher(id, data, params) {
        return {
            statement: `
            MATCH (skill:Skill)
            WHERE id(skill) = ${data.id}
            SET skill.name = '${data.name}',
                skill.strategy = '${data.strategy}',
                skill.updated = timestamp()`
            + SkillsAPI.RETURN()
        };
    }


    // Removes an existing record by id
    deleteCypher(id, params) {
        return {
            statement: `
            MATCH (skill:Skill)
            WHERE id(skill) = ${id}
            DELETE skill`
        };
    }
}

export default SkillsAPI;

