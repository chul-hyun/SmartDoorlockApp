'use strict';

//@TODO 이 파일에 대한 코드 작성 gulp 자동화.

import { combineReducers } from '../util/extend-redux';

import doorlock from './doorlock';

const rootReducer = combineReducers({
    doorlock
});

export default rootReducer;
