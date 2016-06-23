
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

                    const childReducer = combineReducers({
                        menu,page,user
                    });
                    export default function(state = initialState, action){
                        console.log(action, state.toJS());
                        return filter(root(childReducer(state, action), action), action);
                    }
