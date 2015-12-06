// http://feathersjs.com/
'use strict';

import feathers from 'feathers';
import bodyParser from 'body-parser';

var app = feathers();
var todoService = require('./todos');

todoService.init();

app.configure(feathers.rest()).use(bodyParser.json()).use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
}).use('/todos', todoService).listen(3000);
