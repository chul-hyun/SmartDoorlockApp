import { combineReducers } from 'redux-immutablejs';

import page from './page';
import user from './user';

const rootReducer = combineReducers({
    page,
    user
});

export default rootReducer;
