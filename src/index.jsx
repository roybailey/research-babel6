import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
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


// ------------------------------------------------------
// Sample Redux Code
// ------------------------------------------------------

var thunkMiddleware = function ({ dispatch, getState }) {
    console.log('Enter thunkMiddleware');
    return function (next) {
        console.log('Function "next" provided:', next);
        return function (action) {
            console.log('Handling action:', action);
            return ( typeof action === 'function' ) ?
                action(dispatch, getState) :
                next(action)
        }
    }
};

// Just for your curiosity, here is how a middleware to log all actions that are dispatched, would
// look like:

function logMiddleware({ dispatch, getState }) {
    return function (next) {
        return function (action) {
            console.log('logMiddleware action received:', action)
            return next(action)
        }
    }
}
// To tell Redux that we have one or more middlewares, we must use one of Redux's
// helper functions: applyMiddleware.

// "applyMiddleware" takes all your middlewares as parameters and returns a function to be called
// with Redux createStore. When this last function is invoked, it will produce "a higher-order
// store that applies middleware to a store's dispatch".
// (from https://github.com/gaearon/redux/blob/v1.0.0-rc/src/utils/applyMiddleware.js)

// Here is how you would integrate a middleware to your Redux store:

import { createStore, combineReducers, applyMiddleware } from 'redux';

const finalCreateStore = applyMiddleware(logMiddleware, thunkMiddleware)(createStore);
// For multiple middlewares, write: applyMiddleware(middleware1, middleware2, ...)(createStore)

var reducer = combineReducers({
    cars: (state = {}, action = undefined) => {
        console.log('cars was called with state', state, 'and action', action);

        switch (action.type) {
            case 'BRANDS':
                return {
                    ...state,
                    brands: action.brands
                };
            default:
                return state
        }
    },
    users: (state = {}, action = undefined) => {
        console.log('users was called with state', state, 'and action', action);

        switch (action.type) {
            case 'ADD-USER':
                var users = state.users || [];
                users.push(action.name);
                return {
                    ...state,
                    users
                };
            default:
                return state
        }
    }
});

const reduxStore = finalCreateStore(reducer);

var addUserActionCreator = (name) => {
    return {
        type: 'ADD-USER',
        name
    }
};

reduxStore.dispatch(addUserActionCreator('anna'));

// Now that we have our middleware-ready store instance, let's try again to dispatch our async action:

var asyncCarDataLoadActionCreator = (source) => {
    return function (dispatch) {
        console.log(new Date(), 'Simulated asynchronous loading action request');
        setTimeout(function () {
            console.log(new Date(), 'Simulated asynchronous loading action response');
            d3.json(source, (result) => {
                console.log(JSON.stringify(result, undefined, 2));
                dispatch({
                    type: 'BRANDS',
                    brands: result
                })
            });
        }, 5000)
    }
};

console.log("\n", new Date(), 'Running our async action creator:', "\n");

reduxStore.subscribe(function () {
    console.log('reduxStore updated:', reduxStore.getState());
    // Update your views here
});

reduxStore.dispatch(asyncCarDataLoadActionCreator('../src/Sample.json'));

// Output:
//     Mon Aug 03 2015 00:01:20 GMT+0200 (CEST) Running our async action creator:
//     Mon Aug 03 2015 00:01:22 GMT+0200 (CEST) 'Dispatch action now:'
//     speaker was called with state {} and action { type: 'SAY', message: 'Hi' }

// Our action is correctly dispatched 2 seconds after our call the async action creator!

setTimeout(() => {
    console.log(new Date(), '### Current Store State :' + JSON.stringify(reduxStore.getState(), undefined, 2));
    reduxStore.dispatch(addUserActionCreator('bobby'));
}, 2500);
setTimeout(() => {
    console.log(new Date(), '### Current Store State :' + JSON.stringify(reduxStore.getState(), undefined, 2));
    reduxStore.dispatch(addUserActionCreator('colin'));
}, 10000);

// ------------------------------------------------------
// Sample React-Redux Code
// ------------------------------------------------------

import TwoLists from './Sample.jsx';

if (document.querySelector("#TwoListsForm")) {
    ReactDOM.render(
        <Provider store={reduxStore}>
            <TwoLists id="two-lists" source="../src/Sample.json"/>
        </Provider>,
        document.getElementById("TwoListsForm")
    );
}

