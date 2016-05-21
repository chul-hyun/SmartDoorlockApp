import { combineReducers } from '../util/extend-redux';

import doorlock from './doorlock';

const rootReducer = combineReducers({
    doorlock
});

export default rootReducer;
