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
        title: title,
        icon : 'mainPage.png',
        id   : i++
    },
    historyPage: {
        title: '인증기록',
        icon : 'historyPage.png',
        id   : i++
    },
    searchPage: {
        title: '검색',
        icon : 'searchPage.png',
        id   : i++
    },
    searchResultPage: {
        title: '검색결과',
        id   : i++
    },
    setupPage: {
        title: '설정',
        icon : 'setupPage.png',
        id   : i++
    },
    myPage: {
        title: '내 정보',
        icon : 'myPage.png',
        id   : i++
    },
    userListPage: {
        title: '사용자 목록',
        icon : 'userListPage.png',
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
