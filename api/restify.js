'use strict';

import restify from 'restify';
import SkillsAPI from './skills-api';

var skillsService = new SkillsAPI();

var server = restify.createServer({
    name: 'ResearchServices'
});
server.use(restify.CORS());
server.get('/skills', (req, res, next) => {
    skillsService.find(null, (err, data) => {
        res.send(data);
        return next();
    });
});
server.get('/skills/:name', (req, res, next) => {
    skillsService.get(req.params.name, null, (err, data) => {
        res.send(data);
        return next();
    });
});


server.listen(3000);
