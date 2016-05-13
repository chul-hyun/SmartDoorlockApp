/// <reference path="../../definition/main.d.ts"/>

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers';

import { Store } from '../types/index';

export default function configureStore(initialState:Store) {
  const store = createStore(
    reducer,
    initialState,
    compose(
      applyMiddleware(thunk)
    )
  );

  return store;
};
