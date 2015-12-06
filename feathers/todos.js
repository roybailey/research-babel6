'use strict';
import Neo4j from 'rainbird-neo4j';
var db = new Neo4j('http://localhost:7474', 'neo4j', 'localhost');

// todos.js
module.exports = {

    store: {
        // The current id counter
        id: 0,
        // An array with all todos
        todos: [],

        add: function(data) {
            data.id = this.id++;
            this.todos.push(data);
        }
    },

    init: function () {
        db.query('MATCH (person:Resource) RETURN person LIMIT 100', (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log("----- loading -----");
                console.log(JSON.stringify(results, null, 2));
                console.log("----- parsing -----");
                results[0].forEach((row)=> {
                    console.log(row.person.name);
                    this.store.add({ todo: row.person.name });
                });
                console.log("----- complete -----");
            }
        });
    },

// Tries to get a single Todo by its id.
// Throws an error if none can be found.
    getTodo: function (id) {
        var todos = this.store.todos;

        for (var i = 0; i < todos.length; i++) {
            if (todos[i].id === parseInt(id, 10)) {
                return todos[i];
            }
        }

        // If we didn't return yet we can throw an error
        throw new Error('Could not find Todo');
    }
    ,

// Return all Todos
    find: function (params, callback) {
        callback(null, this.store.todos);
    }
    ,

// Returns a single Todo by id
    get: function (id, params, callback) {
        try {
            callback(null, this.getTodo(id));
        } catch (error) {
            callback(error);
        }
    }
    ,

// Create a new Todo
    create: function (data, params, callback) {
        // Increment the global ID counter and
        // use it as the Todos id
        this.store.add(data);
        callback(null, data);
    }
    ,

// Update (replace) an existing Todo with new data
    update: function (id, data, params, callback) {
        try {
            var todo = this.getTodo(id);
            var index = this.store.todos.indexOf(todo);

            data.id = todo.id;
            // Replace all the data
            this.store.todos[index] = data;
            callback(null, data);
        } catch (error) {
            callback(error);
        }
    }
    ,

// Extend the data of an existing Todo
    patch: function (id, data, params, callback) {
        try {
            var todo = this.getTodo(id);

            // Extend the existing Todo with the new data
            Object.keys(data).forEach(function (key) {
                if (key !== 'id') {
                    todo[key] = data[key];
                }
            });

            callback(null, todo);
        } catch (error) {
            callback(error);
        }
    }
    ,

// Remove an existing Todo by id
    remove: function (id, params, callback) {
        try {
            var todo = this.getTodo(id);
            var index = this.store.todos.indexOf(todo);

            // Splice it out of our Todo list
            this.store.todos.splice(index, 1);
            callback(null, todo);
        } catch (error) {
            callback(error);
        }
    }
};
