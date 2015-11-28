import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

import MainNavBar from './NavBar-semantic.jsx';
import Portfolio from './Portfolio-semantic.jsx';
import StatusTable from './StatusTable-semantic.jsx';

var href = window.location.href;
var page = href.substr(href.lastIndexOf('/') + 1);

if (document.querySelector("#NavBar")) {
    console.log(href);
    console.log(page);
    ReactDOM.render(<MainNavBar page={page}/>, document.querySelector("#NavBar"));
}

if (document.querySelector("#Features")) {

    d3.csv("./data/technical-estate.csv", (dataset)=> {
        console.log(JSON.stringify(dataset));
        var categorySet = d3.nest().key((it)=> {
            return it['Category'];
        }).entries(dataset);
        console.log(JSON.stringify(categorySet));
        var props = {
            categories: categorySet.map((it)=> it.key)
        };
        ReactDOM.render(<Portfolio {...props}/>, document.querySelector("#Features"));
    });

}

if (document.querySelector("#DataFlows")) {

    request
        .get('http://localhost:4567/api/v1/nodes')
        //.send({ name: 'Manny', species: 'cat' })
        //.set('X-API-Key', 'foobar')
        .set('Accept', 'application/json')
        .end(function (err, res) {
            if (err) {
                console.log(JSON.stringify(err, undefined, 2));
            } else {
                console.log(JSON.stringify(res.body, undefined, 2));
                console.log(res.body.results[0].data[0].row[0]);
                var results = [];
                res.body.results[0].data.map((data)=> {
                    return data.row.map((row)=> {
                        results.push({"name": row.name, "type": row.type});
                    });
                });
                console.log(JSON.stringify(results, undefined, 2));

                var categorySet = d3.nest().key((it)=> {
                    return it.type;
                }).entries(results);
                console.log(JSON.stringify(categorySet));
                var props = {
                    categories: categorySet.map((it)=> it.key)
                };
                ReactDOM.render(<Portfolio {...props}/>, document.querySelector("#DataFlows"));
            }
        });
}

if (document.querySelector("#Technologies")) {

    d3.csv("./data/technical-estate.csv", (dataset)=> {
        console.log(JSON.stringify(dataset));
        var props = {
            dataset: []
        };
        dataset.filter((it)=> it.Category === "Technical Component").forEach((item=> {
            props.dataset.push({
                group: item.Category,
                title: item.Name,
                status: item.Strategy,
                score: item.Score
            })
        }));
        ReactDOM.render(<StatusTable {...props}/>, document.querySelector("#Technologies"));
    });

}

if (document.querySelector("#Codebase")) {

    d3.csv("./data/codebase.csv", (dataset)=> {
        console.log(JSON.stringify(dataset));
        var props = {
            dataset: []
        };
        dataset.forEach((item=> {
            props.dataset.push({
                group: item.Org,
                title: item.Repo,
                status: item.Type,
                score: item.Complexity
            })
        }));
        ReactDOM.render(<StatusTable {...props}/>, document.querySelector("#Codebase"));
    });
}

