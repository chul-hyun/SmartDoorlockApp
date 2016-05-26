'use strict';

import TYPES from './types';

export function setPage(currentPageId){
    return {
        type : TYPES.SET_PAGE,
        currentPageId
    }
}
