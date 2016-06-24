/*
상수 값 목록
*/

'use strict';

export const middleServerURL = 'http://ec2-52-79-160-28.ap-northeast-2.compute.amazonaws.com:3000';

export const title = "Smart Doorlock";

var i = 1;

export const pages = {
    loadingPage: {
        title: title,
        id   : i++
    },
    initPage: {
        title: title,
        id   : i++
    },
    registPage:{
        title: title,
        id   : i++
    },
    mainPage: {
        title: '홈으로',
        icon : require('../icons/home.png'),
        id   : i++
    },
    historyPage: {
        title: '인증기록',
        icon : require('../icons/list.png'),
        id   : i++
    },
    searchPage: {
        title: '검색',
        icon : require('../icons/search.png'),
        id   : i++
    },
    searchResultPage: {
        title: '검색결과',
        id   : i++
    },
    setupPage: {
        title: '설정',
        icon : require('../icons/setting.png'),
        id   : i++
    },
    myPage: {
        title: '내 정보',
        icon : require('../icons/user.png'),
        id   : i++
    },
    userListPage: {
        title: '사용자 목록',
        icon : require('../icons/users.png'),
        id   : i++
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
    alram1: {
        id: i++
    },
    alram2: {
        id: i++
    }
}
