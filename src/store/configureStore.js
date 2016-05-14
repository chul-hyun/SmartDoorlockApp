import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import devTools from 'remote-redux-devtools';

export default function configureStore(initialState) {
    const store = createStore(
        rootReducer
    )

    return store;
};
