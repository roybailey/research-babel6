'use strict';
import Neo4j from 'rainbird-neo4j';

class SkillsAPI {

    static RETURN() { return `
    RETURN  id(skill) as id,
            skill.name as name,
            skill.strategy as strategy,
            skill.created as created,
            skill.updated as updated`
    };

    log(action, data, params) {
        console.log("---------- " + action);
        console.log(JSON.stringify(data));
        console.log(JSON.stringify(params));
        console.log("----------");
    }


    constructor(db) {
        this.db = db;
        // test out connectivity...
        this.find(null, (err, data)=> {
            if (err) {
                console.log(JSON.stringify(err, null, 2));
            }
            else {
                console.log("SkillsAPI");
                console.log(JSON.stringify(data));
            }
        });
    }


    decoder(results) {
        var response = [];
        results[0].forEach((row)=> {
            response.push({
                id: row.id,
                name: row.name,
                strategy: row.strategy,
                created: row.created,
                updated: row.updated
            });
        });
        console.log(JSON.stringify(response));
        return response;
    }

    // Return all records
    find(params, callback) {

        this.log("findSkill", null, params);
        let QUERY = `
        MATCH (skill:Skill)
        ` +SkillsAPI.RETURN();

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

        this.log("getSkill", id, params);
        let QUERY = `
        MATCH (skill:Skill)
        WHERE id(skill) = ${id}
        ` +SkillsAPI.RETURN();

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

        this.log("createSkill", data, params);
        let PARAMS = {params: data};
        let QUERY = `
        MERGE (skill:Skill {name:'${params.name}'})
        ON CREATE SET skill += {params}
        ON CREATE SET skill.created = timestamp()
        ON MATCH SET skill.updated = timestamp()
        ` +SkillsAPI.RETURN();

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

        this.log("updateSkill", data, params);
        let QUERY = `
        MATCH (skill:Skill)
        WHERE id(skill) = {id}
        SET skill.name = {name},
            skill.strategy = {strategy},
            skill.updated = timestamp()
        ` +SkillsAPI.RETURN();
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

        this.log("patchSkill", data, params);
        let QUERY = `
        MATCH (skill:Skill)
        WHERE id(skill) = ${data.id}
        SET skill.name = '${data.name}',
            skill.strategy = '${data.strategy}',
            skill.updated = timestamp()
        ` +SkillsAPI.RETURN();

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

        this.log("removeSkill", id, params);
        let QUERY = `
        MATCH (skill:Skill)
        WHERE id(skill) = ${id}
        DELETE skill
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

export default SkillsAPI;

