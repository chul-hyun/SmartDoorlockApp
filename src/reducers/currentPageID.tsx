/// <reference path="../../definition/actions/currentPageID.d.ts"/>

import * as TTT from '../actions/currentPageID';

export default function counter(id = 0, action: CurrentPageID.ACTION) {
    switch (action.type) {
        case CurrentPageID.SET_PAGE:
        return action.id;
    default:
        return id;
  }
};
