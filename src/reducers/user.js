/// <reference path="../../definition/main.d.ts"/>

import { SET_PAGE, SET_PAGE_ACTION } from '../actions/currentPageID';

export default function counter(currentPageID = 0, action: SET_PAGE_ACTION) {
  switch (action.type) {
  case SET_PAGE:
    return action.id;
  default:
    return currentPageID;
  }
};
