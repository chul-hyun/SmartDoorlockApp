import { createReducer } from 'redux-immutablejs'
import Immutable from 'immutable';

import store from '../store';
import { pages } from '../static';

import TYPES from '../actions/types';

const initialState = Immutable.Map({
    currentPageID: 1
})

export default createReducer(initialState, {
    [TYPES.SET_PAGE]: (page, action)=> {
        var state = store.getState().toJS();

        if(state.user.registered && action.id == pages.initPage.id){
            return page.merge({
                currentPageID: pages.mainPage.id
            });
        }

        if(!state.user.registered &&  action.id == pages.mainPage.id){
            return page.merge({
                currentPageID: pages.initPage.id
            });
        }

        return page.merge({
            currentPageID: action.id
        });
    }
})
