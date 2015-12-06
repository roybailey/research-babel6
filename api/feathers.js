// http://feathersjs.com/
'use strict';

import feathers from 'feathers';
import bodyParser from 'body-parser';
import todoService from './todos';
import SkillsAPI from './skills-api';

var app = feathers();
var skillsService = new SkillsAPI();

// todoService.init();

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
    .listen(3000);

