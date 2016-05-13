import * as currentPageID from '../actions/currentPageID';

export default function counter(id = 0, action) {
    switch (action.type) {
        case currentPageID.SET_PAGE:
        return action.id;
    default:
        return id;
  }
};
