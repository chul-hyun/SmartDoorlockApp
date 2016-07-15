/*
상수 값 목록
*/

'use strict';

import getKey from '../util/getKey';

export const middleServerURL = 'http://ec2-52-79-160-28.ap-northeast-2.compute.amazonaws.com:3000';

export const title = "Smart Doorlock";

export const pages = {
    loadingPage: {
        title: title,
        id   : getKey(),
    },
    initPage: {
        title: title,
        id   : getKey(),
    },
    registPage:{
        title: title,
        id   : getKey(),
    },
    mainPage: {
        title: '홈으로',
        icon : require('../icons/home.png'),
        id   : getKey(),
    },
    historyPage: {
        title: '인증기록',
        icon : require('../icons/list.png'),
        id   : getKey(),
    },
    searchPage: {
        title: '검색',
        icon : require('../icons/search.png'),
        id   : getKey(),
    },
    searchResultPage: {
        title: '검색결과',
        id   : getKey(),
    },
    setupPage: {
        title: '설정',
        icon : require('../icons/setting.png'),
        id   : getKey(),
    },
    myPage: {
        title: '내 정보',
        icon : require('../icons/user.png'),
        id   : getKey(),
    },
    userListPage: {
        title: '사용자 목록',
        icon : require('../icons/users.png'),
        id   : getKey(),
    }
};

export const sections = [
    {
        menus: ['mainPage']
    },
    {
        title: '사용자',
        menus: ['myPage', 'userListPage']
    },
    {
        title: '기능',
        menus: ['historyPage', 'searchPage', 'setupPage']
    }
];

export const sounds = {
    alarm1: {
        id: getKey(),
    },
    alarm2: {
        id: getKey(),
    }
}
