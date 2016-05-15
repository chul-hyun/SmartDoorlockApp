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

import * as pageActionCreators from '../actions/page';
import * as userActionCreators from '../actions/user';

import * as staticStore from '../static';

class App extends Component {
    regist(){
        let {
            pageActions,
            userActions
        } = this.props

        userActions.register();
        pageActions.setPage(staticStore.pages.mainPage.id);
    }

    unlock(){
        let {
            pageActions,
            userActions
        } = this.props

        userActions.unregister();
        pageActions.setPage(staticStore.pages.initPage.id);
    }

    openMenu(){
        let {
            pageActions,
            userActions
        } = this.props

        userActions.unregister();
        pageActions.setPage(staticStore.pages.initPage.id);
    }

    render() {
        let {
            page,
            user,
            pageActions,
            userActions
        } = this.props

        return (
            <View>
                <Pages currentPageID = {page.currentPageID}>
                    <Page id={staticStore.pages.initPage.id}>
                        <InitPage title={staticStore.title} onRegister={()=>this.regist()} />
                    </Page>
                    <Page id={staticStore.pages.mainPage.id}>
                        <MainPage title={staticStore.title} onUnlock={()=>this.unlock()} onOpenMenu={()=>this.openMenu()} />
                    </Page>
                </Pages>
            </View>
        );
    }
}



function mapStateToProps(state) {
    return state.toJS();
}

function checkRegisted(state){
    return state.user.registered && state.page.currentPageID == staticStore.pages.initPage.id;
}

function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActionCreators, dispatch),
        userActions: bindActionCreators(userActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
