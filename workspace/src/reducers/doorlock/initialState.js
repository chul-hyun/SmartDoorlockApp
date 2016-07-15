'use strict';

import Immutable from 'immutable';
import { pages, sounds } from '../../static/app';

export default Immutable.fromJS({
    user: {
        name              : null,
        id                : null,
        password          : null,
        registDate        : 0,
        latestAuthDate    : 0,
        doorlockId        : null,
        GCMRegistrationId : null
    },
    history: [],
    users: [],
    search: {
        filter: {
            startDate   : null,
            endDate     : null,
            userID      : -1,
            searchState : false
        },
        history: []
    },
    page: {
        currentPageId : pages.loadingPage.id
    },
    setting: {
        alarm:{
            onAuthSuccess : true,
            onAuthFail    : true,
            onTempWarning : true,
            onNewUser     : true,
        }
    },
    menu: {
        show : false
    }
});
