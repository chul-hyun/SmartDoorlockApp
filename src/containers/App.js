import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    PropTypes,
} from 'react-native';

import {
    Page,
    Pages,
    InitPage,
    MainPage
} from '../components';

import {
    doorlockActionCreators,
    menuActionCreators,
    pageActionCreators,
    userActionCreators
} from '../actions/doorlock';

import * as staticStore from '../static/app';

class App extends Component {
    componentWillMount(){
        let { mainActions } = this.props.doorlock;
        mainActions.init();
    }
    render() {
        let { doorlock } = this.props

        return (
            <View>
                <Pages currentPageID = {doorlock.getIn(['page', 'currentPageID'])}>
                    <Page id={staticStore.pages.loadingPage.id}>
                        <LoadingPage title={staticStore.title} />
                    </Page>
                    <Page id={staticStore.pages.initPage.id}>
                        <InitPage title={staticStore.title} onRegister={userActions.register} />
                    </Page>
                    <Page id={staticStore.pages.mainPage.id}>
                        <MainPage title={staticStore.title} onUnlock={userActions.unregister} onOpenMenu={userActions.unregister} />
                    </Page>
                </Pages>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        doorlock: state.get('doorlock')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doorlock: {
            mainActions: bindActionCreators(doorlockActionCreators, dispatch),
            menuActions: bindActionCreators(menuActionCreators, dispatch),
            pageActions: bindActionCreators(pageActionCreators, dispatch),
            userActions: bindActionCreators(userActionCreators, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
