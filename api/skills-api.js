'use strict';
import Neo4j from 'rainbird-neo4j';

class SkillsAPI {


    constructor() {
        this.db = new Neo4j('http://localhost:7474', 'neo4j', 'localhost');

        this.cache = {
            // The current id counter
            id: 0,
            // An array with all records
            records: [],

            add(data) {
                data.id = this.id++;
                this.records.push(data);
            },

            get(id) {
                var records = this.records;
                console.log("GET:"+id);
                for (var index = 0; index < records.length; index++) {
                    if (records[index].id === parseInt(id, 10)) {
                        return records[index];
                    }
                }
                // If we didn't return yet we can throw an error
                throw new Error('Could not find record '+id);
            }
        };


        this.db.query('MATCH (person:Resource) RETURN person', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log("----- loading -----");
                console.log(JSON.stringify(results, null, 2));
                console.log("----- parsing -----");
                results[0].forEach((row)=> {
                    console.log(row.person.name);
                    this.cache.add(row.person);
                });
                console.log("----- complete -----");
            }
        });
    }



    // Return all Todos
    find(params, callback) {
        callback(null, this.cache.records);
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

