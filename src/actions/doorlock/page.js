'use strict';

import TYPES from './types';

export function setPage(currentPageID){
    return {
        type : TYPES.SET_PAGE,
        currentPageID
    }
}
