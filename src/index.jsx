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
        .get('http://localhost:4567/api/v1/nodes')
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

//var ne4j = function(urlSource) {
//    function txUrl() {
//        var url = (urlSource() || "http://localhost:7474").replace(/\/db\/data.*/,"");
//        return url + "/db/data/transaction/commit";
//    }
//    var me = {
//        executeQuery: function(query, params, cb) {
//            $.ajax(txUrl(), {
//                type: "POST",
//                data: JSON.stringify({
//                    statements: [{
//                        statement: query,
//                        parameters: params || {},
//                        resultDataContents: ["row", "graph"]
//                    }]
//                }),
//                contentType: "application/json",
//                error: function(err) {
//                    cb(err);
//                },
//                success: function(res) {
//                    if (res.errors.length > 0) {
//                        cb(res.errors);
//                    } else {
//                        var cols = res.results[0].columns;
//                        var rows = res.results[0].data.map(function(row) {
//                            var r = {};
//                            cols.forEach(function(col, index) {
//                                r[col] = row.row[index];
//                            });
//                            return r;
//                        });
//                        var nodes = [];
//                        var rels = [];
//                        var labels = [];
//                        res.results[0].data.forEach(function(row) {
//                            row.graph.nodes.forEach(function(n) {
//                                var found = nodes.filter(function (m) { return m.id == n.id; }).length > 0;
//                                if (!found) {
//                                    var node = n.properties||{}; node.id=n.id;node.type=n.labels[0];
//                                    nodes.push(node);
//                                    if (labels.indexOf(node.type) == -1) labels.push(node.type);
//                                }
//                            });
//                            rels = rels.concat(row.graph.relationships.map(function(r) { return { source:r.startNode, target:r.endNode, caption:r.type} }));
//                        });
//                        cb(null,{table:rows,graph:{nodes:nodes, edges:rels},labels:labels});
//                    }
//                }
//            });
//        }
//    };
//    return me;
//};

request
    .get('http://localhost:3000/todos')
    .end(function (err, res) {
        if (err) {
            console.log(JSON.stringify(err, undefined, 2));
        } else {
            console.log(JSON.stringify(res.body, undefined, 2));
        }
    });

