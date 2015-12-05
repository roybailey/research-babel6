import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import request from 'superagent';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import TwoLists from './SampleReduxTwoLists.jsx';

export default function () {
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

    if (document.querySelector("#TwoListsForm")) {
        ReactDOM.render(
            <Provider store={reduxStore}>
                <TwoLists id="two-lists" source="../src/Sample.json"/>
            </Provider>,
            document.getElementById("TwoListsForm")
        );
    }

}
