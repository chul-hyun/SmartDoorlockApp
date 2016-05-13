/// <reference path="../../main.d.ts"/>

export default function counter(currentPageID = 0, action: SET_PAGE_ACTION) {
  switch (action.type) {
  case SET_PAGE:
    return action.id;
  default:
    return currentPageID;
  }
};
