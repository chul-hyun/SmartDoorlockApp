/// <reference path="../../definition/main.d.ts"/>

import { PageID } from '../types/index';

export namespace setting {
    export enum TYPES {
        SET_PAGE
    }

    export type ACTION = {type: TYPES, id: PageID}

    export function setPage(id: PageID): ACTION {
        return {
            type : TYPES.SET_PAGE,
            id   : id
        };
    }
}
