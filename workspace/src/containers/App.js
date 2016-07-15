<<<<<<< HEAD
console.log('App');

=======
>>>>>>> 9dbce7daa6d0bf2ed1f40f4e4d87950f0b2dc482
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

import * as staticStore from '../static/app';

import { commonStyles } from '../static/styles';

import pushNotification from '../util/pushNotification';
import reactGcmAndroid from 'react-native-gcm-android';

import createReduxComponent from './createReduxComponent';

class App extends Component {
    componentWillMount(){
<<<<<<< HEAD
        console.log('App componentWillMount');

=======
>>>>>>> 9dbce7daa6d0bf2ed1f40f4e4d87950f0b2dc482
        let { userActions, settingActions } = this.props.actions;
        userActions.checkUserInfo();
        userActions.login();
        settingActions.init();
    }
    componentWillReceiveProps(){
    }
    componentDidMount(){
<<<<<<< HEAD
        console.log('App componentDidMount');

=======
>>>>>>> 9dbce7daa6d0bf2ed1f40f4e4d87950f0b2dc482
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
            //console.log('sysNotificationClick', e);
        });

        reactGcmAndroid.requestPermissions();
<<<<<<< HEAD

    }
    render() {
        console.log('App render');

=======
    }
    render() {
>>>>>>> 9dbce7daa6d0bf2ed1f40f4e4d87950f0b2dc482
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
            <View style={[commonStyles.base]}>
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
                            <LoadingPage />
                        </Page>
                        <Page id={mainPage.id}>
                            <MainPage />
                        </Page>
                        <Page id={initPage.id}>
                            <InitPage />
                        </Page>
                        <Page id={registPage.id}>
                            <RegistPage />
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
                            <MyPage />
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

function getCurrentPageTitle(currentPageId){
    for(let title in staticStore.pages){
        if(staticStore.pages[title].id === currentPageId){
            return title;
        }
    }
}

export default createReduxComponent(App);
