import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import request from 'superagent';
import xmldoc from 'xmldoc';

import MainNavBar from './NavBar-semantic.jsx';
import Portfolio from './Portfolio-semantic.jsx';
import StatusTable from './StatusTable-semantic.jsx';
import JIRAReport from './JIRAReport.jsx';

var href = window.location.href;
var page = href.substr(href.lastIndexOf('/') + 1);

if (document.querySelector("#NavBar")) {
    console.log(href);
    console.log(page);
    ReactDOM.render(<MainNavBar page={page}/>, document.querySelector("#NavBar"));
}

if (document.querySelector("#Features")) {

    d3.json("/api/feature", (dataset)=> {
        console.log(JSON.stringify(dataset));
        var cards = dataset.map((item)=> {
            return {
                id: item.id,
                header: item.Name
            }
        });
        console.log(JSON.stringify(cards));
        var categorySet = [{
            key: 'Features',
            values: dataset.map((item)=> {
                return {
                    id: item.id,
                    header: item.name
                }
            })
        }];
        console.log(JSON.stringify(categorySet));
        var props = {
            categories: categorySet
        };
        ReactDOM.render(<Portfolio {...props}/>, document.querySelector("#Features"));
    });

}

if (document.querySelector("#Delivery")) {

    request
        .get('/public/data/JIRA-export.xml')
        .end(function (err, res) {
            if (res.ok) {
                console.log(JSON.stringify(res));
                var xml = res.text;
                console.log(xml);
                var obj = new xmldoc.XmlDocument(xml);
                // console.log(obj);
                var items = [];
                obj.children[0].children.forEach((itemXml)=> {
                    switch (itemXml.name) {
                        case "item":
                            var item = {};
                            itemXml.children.forEach((itemChild)=> {
                                item[itemChild.name] = itemChild.val;
                            });
                            items.push(item);
                            console.log(item);
                            break;
                        default:
                            console.log("Ignoring non-item: " + itemXml.name);
                            break;
                    }
                });
                console.log(items);
                var props = {
                    items: items
                };
                ReactDOM.render(<JIRAReport {...props}/>, document.querySelector("#Delivery"));
            } else {
                console.log(JSON.stringify(err));
                alert('Oh no! error ' + res.text);
            }
        });
}

if (document.querySelector("#DataFlows")) {

    request
        .get('/api/technologies')
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

    d3.json("/api/technology", (dataset)=> {
        var rating = ['Reduce','Review','Keep','Improve','Strategic'];
        console.log(JSON.stringify(dataset));
        var onRating = function(p1,p2) {
            console.log("Top level Technology Rating change notification");
            console.log(p1);
            console.log(p2);
            var patchData = {
                id: p1.id,
                category: p1.group,
                name: p1.title,
                strategy: rating[-1+p2]
            };
            console.log("PATCH: /api/technology/"+p1.id);
            console.log("WITH : "+JSON.stringify(patchData));
            request.patch("/api/technology/"+p1.id)
                .send(patchData)
                .set('Accept', 'application/json')
                .end(function (err, res) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(res.text);
                    }
                });
        };
        var props = {
            dataset: [],
            onRating: onRating
        };
        dataset.forEach((item=> {
            props.dataset.push({
                id: item.id,
                group: item.category,
                title: item.name,
                status: item.strategy,
                score: rating.indexOf(item.strategy)+1
            })
        }));
        ReactDOM.render(<StatusTable {...props}/>, document.querySelector("#Technologies"));
    });

}

if (document.querySelector("#Codebase")) {

    d3.csv("./data/codebase.csv", (dataset)=> {
        console.log(JSON.stringify(dataset));
        var onRating = function(p1,p2) {
            console.log("Top level Codebase Rating change notification");
            console.log(p1);
            console.log(p2);
        };
        var props = {
            dataset: [],
            onRating: onRating
        };
        dataset.forEach((item=> {
            props.dataset.push({
                group: item.Org,
                title: item.Repo,
                status: item.Type,
                score: item.Complexity
            })
        }));
        ReactDOM.render(<StatusTable {...props} />, document.querySelector("#Codebase"));
    });
}


// ------------------------------------------------------
// Sample Redux Code
// ------------------------------------------------------

import SampleRedux from './SampleRedux.jsx';

if (document.querySelector("#TwoListsForm")) {
    SampleRedux();
}

// ------------------------------------------------------
// Sample Neo4j Request
// ------------------------------------------------------

request
    .get('http://localhost:3000/api/skills')
    .end(function (err, res) {
        if (err) {
            console.log(JSON.stringify(err, undefined, 2));
        } else {
            console.log(JSON.stringify(res.body, undefined, 2));
        }
    });

