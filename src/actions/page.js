'use strict';

import TYPES from './types';
import store from '../store';
import { pages } from '../static';

export function setPage(id){
    return {
        type : TYPES.SET_PAGE,
        id   : id
    };
}
