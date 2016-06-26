
                    // gulp 로 자동생성된 파일.
                    // combine reducers

                    'use strict';
                    import { combineReducers } from '../../util/extend-redux';
                    import filter from './filter';
                    import root from './root';
                    import initialState from './initialState';
                    import Immutable from 'immutable';
                    import menu from './menu'
import page from './page'
import user from './user'
import users from './users'
import history from './history'
import setting from './setting'
import search from './search'

                    const childReducer = combineReducers({
                        menu, page, user, users, history, setting, search
                    });
                    export default function(state = initialState, action){
                        console.log(action, state.toJS());
                        return filter(root(childReducer(state, action), action), action);
                    }
