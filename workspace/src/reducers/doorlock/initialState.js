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
        successAlram : true,
        failAlram    : true,
        alarmSound   : sounds.alram1.id
    },
    menu: {
        show : false
    }
});
