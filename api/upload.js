'use strict';

import request from'superagent';
import d3 from'd3';

d3.csv('http://localhost:3000/public/data/resource-pool.csv', (dataset) => {
    console.log(JSON.stringify(dataset));
});

