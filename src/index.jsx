import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

import MainNavBar from './NavBar-semantic.jsx';
import SplashScreen from './SplashScreen.jsx';
import SectionOverview from './SectionOverview.jsx';
import ArticleOverview from './ArticleOverview.jsx';
import ThumbnailBar from './ThumbnailBar.jsx';
import Portfolio from './Portfolio-uikit-sample.jsx';

if (document.querySelector("#NavBar")) {
    ReactDOM.render(<MainNavBar/>, document.querySelector("#NavBar"));
}

if (document.querySelector("#SplashScreen")) {
    ReactDOM.render(<SplashScreen/>, document.querySelector("#SplashScreen"));
}

if (document.querySelector("#SectionOverview")) {
    ReactDOM.render(<SectionOverview/>, document.querySelector("#SectionOverview"));
}

if (document.querySelector("#ArticleOverview")) {
    ReactDOM.render(<ArticleOverview/>, document.querySelector("#ArticleOverview"));
}

if (document.querySelector("#Features")) {

    d3.csv("../data/technical-estate.csv", (dataset)=> {
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

    d3.csv("../data/technical-estate.csv", (dataset)=> {
        console.log(JSON.stringify(dataset));
        var categorySet = d3.nest().key((it)=> {
            return it['Name'];
        }).entries(dataset);
        console.log(JSON.stringify(categorySet));
        var props = {
            categories: categorySet.map((it)=> it.key)
        };
        ReactDOM.render(<Portfolio {...props}/>, document.querySelector("#Technologies"));
    });

}

if (document.querySelector("#ThumbnailBar")) {
    ReactDOM.render(<ThumbnailBar/>, document.querySelector("#ThumbnailBar"));
}
