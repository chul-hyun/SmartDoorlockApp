import {
    bindActionCreators, connect
} from '../util/extend-redux'

import {
    doorlockActionCreators,
    menuActionCreators,
    pageActionCreators,
    userActionCreators,
    usersActionCreators,
    historyActionCreators,
    settingActionCreators,
} from '../actions/doorlock';

function mapStateToProps(state) {
    return {
        store: state.get('doorlock')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            doorlockActions : bindActionCreators(doorlockActionCreators, dispatch),
            menuActions     : bindActionCreators(menuActionCreators, dispatch),
            pageActions     : bindActionCreators(pageActionCreators, dispatch),
            userActions     : bindActionCreators(userActionCreators, dispatch),
            usersActions    : bindActionCreators(usersActionCreators, dispatch),
            historyActions    : bindActionCreators(historyActionCreators, dispatch),
            settingActions    : bindActionCreators(settingActionCreators, dispatch),
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps);
