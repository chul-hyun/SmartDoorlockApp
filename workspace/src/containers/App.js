import {
    bindActionCreators
} from '../util/extend-redux'

import {
    connect
} from 'react-redux'

import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    Text,
    View,
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

import pushNotification from '../util/pushNotification';
import reactGcmAndroid from 'react-native-gcm-android';

class App extends Component {
    componentWillMount(){
        let { userActions } = this.props.actions;
        userActions.login();
    }
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }
    componentDidMount(){
        let { userActions } = this.props.actions;

        reactGcmAndroid.addEventListener('register', (GCMRegistrationId)=>{
            console.log('send gcm GCMRegistrationId to server', GCMRegistrationId);
            userActions.setGCMID(GCMRegistrationId);
        });
        reactGcmAndroid.addEventListener('notification', (notificationData)=>{
            console.log('notificationData', notificationData);
            notificationData = JSON.parse(notificationData.data.info);
            //if (!reactGcmAndroid.isInForeground) { // 백그라운드에서 실행 중 일때
                pushNotification(notificationData);
            //}
        });

        DeviceEventEmitter.addListener('sysNotificationClick', (e)=> {
            console.log('sysNotificationClick', e);
        });

        reactGcmAndroid.requestPermissions();
    }
    render() {
        console.log('render');
        let { store } = this.props
        let { userActions, menuActions, pageActions, doorlockActions } = this.props.actions;

        let { regist }     = userActions;
        let { hide, show } = menuActions;
        let { setPage }    = pageActions;
        let { unlock }     = doorlockActions;

        let { title, pages, sections } = staticStore;

        let {
            loadingPage,
            initPage,
            registPage,
            mainPage,
            historyPage,
            searchPage,
            searchResultPage,
            setupPage,
            myPage,
            userListPage
        } = pages;

        let currentPageId = store.getIn(['page', 'currentPageId']);

        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                <SideMenu
                    title         = {title}
                    menus         = {pages}
                    sections      = {sections}
                    selectedMenu  = {getCurrentPageTitle(currentPageId)}
                    onPressMenu   = {setPage}
                    show          = {store.getIn(['menu', 'show'])}
                    onDrawerClose = {hide}
                    onDrawerOpen  = {show}>
                    <Pages currentPageId = {store.getIn(['page', 'currentPageId'])}>
                        <Page id={loadingPage.id}>
                            <LoadingPage title={loadingPage.title} />
                        </Page>
                        <Page id={mainPage.id}>
                            <MainPage title={mainPage.title} onUnlock={unlock} onShowMenu={show} />
                        </Page>
                        <Page id={initPage.id}>
                            <InitPage title={initPage.title} onStart={()=>setPage(registPage.id)} />
                        </Page>
                        <Page id={registPage.id}>
                            <RegistPage title={registPage.title} onRegist={regist} />
                        </Page>
                        <Page id={historyPage.id}>
                            <HistoryPage title={historyPage.title} onShowMenu={show} />
                        </Page>
                        <Page id={searchPage.id}>
                            <SearchPage title={searchPage.title} onShowMenu={show} />
                        </Page>
                        <Page id={searchResultPage.id}>
                            <SearchResultPage title={searchResultPage.title} onShowMenu={show} />
                        </Page>
                        <Page id={setupPage.id}>
                            <SetupPage title={setupPage.title} onShowMenu={show} />
                        </Page>
                        <Page id={myPage.id}>
                            <MyPage title={myPage.title} onShowMenu={show} />
                        </Page>
                        <Page id={userListPage.id}>
                            <UserListPage title={userListPage.title} onShowMenu={show} />
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
            doorlockActions : bindActionCreators(doorlockActionCreators, dispatch),
            menuActions     : bindActionCreators(menuActionCreators, dispatch),
            pageActions     : bindActionCreators(pageActionCreators, dispatch),
            userActions     : bindActionCreators(userActionCreators, dispatch)
        }
    }
}

function getCurrentPageTitle(currentPageId){
    for(let title in staticStore.pages){
        if(staticStore.pages[title].id === currentPageId){
            return title;
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
