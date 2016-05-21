
                    'use strict';

                    import { combineReducers } from '../../util/extend-redux';

                    import filter from './filter';

                    import initialState from './initialState';

                    import Immutable from 'immutable';

                    import menu from './menu'
import page from './page'
import user from './user'


                    const childReducer = combineReducers({
                        menu,page,user
                    });

                    export default function(state = initialState, action){
                        return childReducer(filter(state, action), action);
                    }