import { combineReducers } from 'redux-immutablejs';

import doorlock from './doorlock';

const rootReducer = combineReducers({
    doorlock
});

export default rootReducer;
