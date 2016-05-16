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

export const menu = {
    sections: [{
        menus: [pages.mainPage.id]
    },{
        title: '사용자',
        menus: [pages.myPage.id, pages.userListPage.id]
    },{
        title: '기능',
        menus: [pages.historyPage.id, pages.searchPage.id, pages.setupPage.id]
    }]
}

export const sounds = {
    alram1: {
        id: i++
    },
    alram2: {
        id: i++
    }
}
