/// <reference path="../../main.d.ts"/>

export const SET_PAGE = 'SET_PAGE';
export type SET_PAGE_ACTION = {type: string, id: PageID}

import { PageID } from '../types/index';

export function setPage(id: PageID): SET_PAGE_ACTION {
    return {
        type : SET_PAGE,
        id   : id
    };
};
