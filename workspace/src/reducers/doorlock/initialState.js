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
            startTime : -1,
            endTime   : -1,
            user      : null,
            state     : null
        },
        result: []
    },
    page: {
        currentPageId : pages.loadingPage.id
    },
    setting: {
        alarm:{
            onAuthSuccess : true,
            onAuthFail    : true,
            onTempWarning : true,
        }
    },
    menu: {
        show : false
    }
});
