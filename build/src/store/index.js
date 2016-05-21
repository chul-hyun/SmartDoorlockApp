'use strict';

import { createStore, applyMiddleware, compose } from '../util/extend-redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import devTools from 'remote-redux-devtools';
import Immutable from 'immutable';

function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        rootReducer(initialState),
        compose(
            applyMiddleware(thunk),
            devTools({
                name: 'Doorlock App',
                realtime: true
            })
        )
    )

    if(module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
};

const store = configureStore();

export default store;
