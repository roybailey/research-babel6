// http://feathersjs.com/
'use strict';

import feathers from 'feathers';
import bodyParser from 'body-parser';
import multer from 'multer';

import Neo4j from 'rainbird-neo4j';

import SkillsAPI from './api/skills-api';
import PeopleAPI from './api/people-api';

var upload = multer({dest: 'uploads/'});

var db = new Neo4j('http://localhost:7474', 'neo4j', 'localhost');
var skillsService = new SkillsAPI(db);
var peopleService = new PeopleAPI(db);

var app = feathers();

console.log(__dirname);

app.configure(feathers.rest())
    .use(bodyParser.json())
    .use(feathers.static(__dirname+'/public'))
    .use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header("Content-Type", "application/json");
        next();
    })
    .post('/upload/people', upload.single('file'), function (req, res, next) {
        console.log("People Uploading...");
        console.log(req.file);
        console.log(JSON.stringify(req.body));
    })
    .post('/upload/skills', upload.single('file'), function (req, res, next) {
        console.log("Skills Uploading...");
        console.log(req.file);
        console.log(JSON.stringify(req.body));
    })
    .use('/api/skills', skillsService)
    .use('/api/people', peopleService)
    .listen(3000);
