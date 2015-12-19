// http://feathersjs.com/
'use strict';

import feathers from 'feathers';
import bodyParser from 'body-parser';
import multer from 'multer';

import Neo4j from 'rainbird-neo4j';

import SkillsAPI from './api/skills-api';
import PeopleAPI from './api/people-api';
import FeatureAPI from './api/feature-api';
import TechnologyAPI from './api/technology-api';
import CodebaseAPI from './api/codebase-api';

var upload = multer({dest: 'uploads/'});

var db = new Neo4j('http://localhost:7474', 'neo4j', 'localhost');
var skillsService = new SkillsAPI(db, 'SkillsAPI');
var peopleService = new PeopleAPI(db, 'PeopleAPI');
var featureService = new FeatureAPI(db, 'FeatureAPI');
var technologyService = new TechnologyAPI(db, 'TechnologyAPI');
var codebaseService = new CodebaseAPI(db, 'CodebaseAPI');

var app = feathers();

console.log(__dirname);

app.configure(feathers.rest())
    .use(bodyParser.json())
    .use(feathers.static(__dirname + '/public'))
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
    .use('/api/feature', featureService)
    .use('/api/technology', technologyService)
    .use('/api/codebase', codebaseService)
    .listen(3000);
