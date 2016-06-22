'use strict';

import { createStore, applyMiddleware, compose } from '../util/extend-redux';
import thunk from 'redux-thunk'; // 비동기 redux를 위한 모듈
//@TODO 에러 처리를 위한 redux 모듈 작성 및 적용
//@TODO thunk 모듈을 삭제하고, async 함수를 받을시 / 이외값을 받을시로 분리하여
// 동작가능한 모듈 작성 및 적용
import devTools from 'remote-redux-devtools';

import rootReducer from '../reducers';

function configureStore(initialState) {
    const store = createStore(
        rootReducer,
        rootReducer(initialState),
        compose(
            applyMiddleware(thunk),
            devTools({
                name: 'Doorlock App',
                realtime: true
                //@TODO 실제 스마트폰 테스트중이므로 IP와 PORT 지정 필요.
            })
        )
    )

    if(module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers').default
            store.replaceReducer(nextRootReducer)
        })
    }

    return store;
};

const store = configureStore();

export default store;
