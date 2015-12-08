'use strict';
import Neo4j from 'rainbird-neo4j';

class SkillsAPI {


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


    // Return all records
    find(params, callback) {

        let QUERY = `
        MATCH (skill:Skill)
        RETURN id(skill) as id, skill.name as skill, skill.type as type
        `;

        this.db.query(QUERY, (err, results) => {
            if (err) {
                console.log(err);
                callback(err, null);
            } else {
                console.log(JSON.stringify(results, null, 2));
                var response = [];
                results[0].forEach((row)=> {
                    response.push({
                        id: row.id,
                        skill: row.skill,
                        type: row.type
                    });
                });
                callback(null, response);
            }
        });

    }


    // Gets a single record by id
    get(id, params, callback) {
        try {
            callback(null, this.cache.get(id));
        } catch (error) {
            callback(error);
        }
    }


    // Creates a new record
    create(data, params, callback) {
        // Increment the global ID counter and
        // use it as the Todos id
        this.cache.add(data);
        callback(null, data);
    }


    // Updates (replaces) an existing record with new data
    update(id, data, params, callback) {
        try {
            var record = this.cache.get(id);
            var index = this.cache.records.indexOf(record);

            data.id = record.id;
            // Replace all the data
            this.cache.records[index] = data;
            callback(null, data);
        } catch (error) {
            callback(error);
        }
    }


    // Extends the data of an existing record
    patch(id, data, params, callback) {
        try {
            var record = this.cache.get(id);

            // Extend the existing Todo with the new data
            Object.keys(data).forEach(function (key) {
                if (key !== 'id') {
                    record[key] = data[key];
                }
            });

            callback(null, record);
        } catch (error) {
            callback(error);
        }
    }


    // Removes an existing record by id
    remove(id, params, callback) {
        try {
            var record = this.cache.get(id);
            var index = this.cahce.records.indexOf(record);

            // Splice it out of our Todo list
            this.cache.records.splice(index, 1);
            callback(null, record);
        } catch (error) {
            callback(error);
        }
    }
}

export default SkillsAPI;

