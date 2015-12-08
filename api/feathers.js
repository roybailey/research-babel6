// http://feathersjs.com/
'use strict';

import feathers from 'feathers';
import bodyParser from 'body-parser';
import todoService from './todos';

import Neo4j from 'rainbird-neo4j';

import SkillsAPI from './skills-api';
import PeopleAPI from './people-api';

var db = new Neo4j('http://localhost:7474', 'neo4j', 'localhost');
var skillsService = new SkillsAPI(db);
var peopleService = new PeopleAPI(db);

var app = feathers();

app.configure(feathers.rest())
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
    .use('/todos', todoService)
    .use('/skills', skillsService)
    .use('/people', peopleService)
    .listen(3000);

