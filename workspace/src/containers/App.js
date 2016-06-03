import { bindActionCreators } from '../util/extend-redux'
import { connect } from 'react-redux'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    PropTypes,
    DeviceEventEmitter
} from 'react-native';

import {
    Page,
    Pages,
    SideMenu,
    LoadingPage,
    InitPage,
    MainPage,
    RegistPage,
    HistoryPage,
    SearchPage,
    SearchResultPage,
    SetupPage,
    MyPage,
    UserListPage
} from '../components';

import {
    doorlockActionCreators,
    menuActionCreators,
    pageActionCreators,
    userActionCreators
} from '../actions/doorlock';

import * as staticStore from '../static/app';

//import Notification from 'react-native-system-notification';
//import GcmAndroid from 'react-native-gcm-android';

class App extends Component {
    componentWillMount(){
        let { userActions } = this.props.actions;
        userActions.login();
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    componentDidMount(){
        let { userActions, doorlockActions } = this.props.actions;
/*
        GcmAndroid.addEventListener('register', (GCMRegistrationId)=>{
            console.log('send gcm GCMRegistrationId to server', GCMRegistrationId);
            userActions.setGCMID(GCMRegistrationId);
        });
        GcmAndroid.addEventListener('notification', (notification)=>{
            let info = JSON.parse(notification.data.info);
            //if (!GcmAndroid.isInForeground) {
                Notification.create({
                    message: info.message
                });
            //}
        });

        DeviceEventEmitter.addListener('sysNotificationClick', (e)=> {
            console.log('sysNotificationClick', e);
        });

        GcmAndroid.requestPermissions();*/
    }
    render() {
        console.log('render');
        let { store } = this.props
        let { userActions, menuActions, pageActions, doorlockActions } = this.props.actions;

        let currentPageId = store.getIn(['page', 'currentPageId']);
        let currentPageTitle = '';
        for( let title in staticStore.pages ){
            if(staticStore.pages[title].id === currentPageId){
                currentPageTitle = title;
            }
        }

        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <SideMenu
                    title         = {staticStore.title}
                    menus         = {staticStore.pages}
                    sections      = {staticStore.sections}
                    selectedMenu  = {currentPageTitle}
                    onPressMenu   = {pageActions.setPage}
                    show          = {store.getIn(['menu', 'show'])}
                    onDrawerClose = {menuActions.hide}
                    onDrawerOpen  = {menuActions.show}>
                    <Pages currentPageId = {store.getIn(['page', 'currentPageId'])}>
                        <Page id={staticStore.pages.loadingPage.id}>
                            <LoadingPage title={staticStore.pages.loadingPage.title} />
                        </Page>
                        <Page id={staticStore.pages.mainPage.id}>
                            <MainPage title={staticStore.pages.mainPage.title} onUnlock={doorlockActions.unlock} onShowMenu={menuActions.show} />
                        </Page>
                        <Page id={staticStore.pages.initPage.id}>
                            <InitPage title={staticStore.pages.initPage.title} onStart={()=>pageActions.setPage(staticStore.pages.registPage.id)} />
                        </Page>
                        <Page id={staticStore.pages.registPage.id}>
                            <RegistPage title={staticStore.pages.registPage.title} onRegist={userActions.regist} />
                        </Page>
                        <Page id={staticStore.pages.historyPage.id}>
                            <HistoryPage title={staticStore.pages.historyPage.title} onShowMenu={menuActions.show} />
                        </Page>
                        <Page id={staticStore.pages.searchPage.id}>
                            <SearchPage title={staticStore.pages.searchPage.title} onShowMenu={menuActions.show} />
                        </Page>
                        <Page id={staticStore.pages.searchResultPage.id}>
                            <SearchResultPage title={staticStore.pages.searchResultPage.title} onShowMenu={menuActions.show} />
                        </Page>
                        <Page id={staticStore.pages.setupPage.id}>
                            <SetupPage title={staticStore.pages.setupPage.title} onShowMenu={menuActions.show} />
                        </Page>
                        <Page id={staticStore.pages.myPage.id}>
                            <MyPage title={staticStore.pages.myPage.title} onShowMenu={menuActions.show} />
                        </Page>
                        <Page id={staticStore.pages.userListPage.id}>
                            <UserListPage title={staticStore.pages.userListPage.title} onShowMenu={menuActions.show} />
                        </Page>
                    </Pages>
                </SideMenu>
            </View>
        );
    }
}

App.propTypes = {

}

App.defaultProps = {

}

function mapStateToProps(state) {
    return {
        store: state.get('doorlock')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            doorlockActions: bindActionCreators(doorlockActionCreators, dispatch),
            menuActions: bindActionCreators(menuActionCreators, dispatch),
            pageActions: bindActionCreators(pageActionCreators, dispatch),
            userActions: bindActionCreators(userActionCreators, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
