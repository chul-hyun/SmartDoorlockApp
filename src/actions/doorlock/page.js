'use strict';

import TYPES from './types';

export function setPage(id){
    return {
        type : TYPES.SET_PAGE,
        id
    }
}
