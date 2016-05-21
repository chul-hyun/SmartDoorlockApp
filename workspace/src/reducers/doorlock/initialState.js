import Immutable from 'immutable';
import { pages, sounds } from '../../static/app';

export default Immutable.Map({
    user: {
        info: {
            registDate : new Date(),
            latestAuthDate : new Date(),
            name : "name",
            key : -1
        },
        registered: false
    },
    history: [],
    users: [],
    search: {
        filter: {
            startTime: -1,
            endTime: -1,
            user: null,
            state: null
        },
        result: []
    },
    page: {
        currentPageID: pages.loadingPage.id
    },
    setting: {
        successAlram: true,
        failAlram: true,
        alarmSound: sounds.alram1.id
    },
    menu: {
        show: false
    }
});
