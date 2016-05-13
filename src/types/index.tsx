/// <reference path="../../definition/main.d.ts"/>

export enum AuthState {
    Success,
    Fail
}

export interface History {
    datetime : number
    state    : AuthState
    name     : string
}

export interface UserInfo {
    registDate     : Date
    latestAuthDate : Date
    name           : string
    key?           : number /* 인증키 */
}

export interface Menu {
    icon  : string
    name  : string
    id    : number
}

export interface Section {
    title : string
    menus : [number]
}

export interface Page {
    title : string
    id    : number
}

export interface SearchFilter {
    startTime : number
    endTime   : number
    user      : string
    state     : AuthState
};

export interface Store {
    static: {
        title     : string
        pages     : [Page]
    }
    user       : UserInfo
    registered : boolean
    histories  : [History]
    users      : [UserInfo]
    search     : {
        filter : SearchFilter,
        result : [History]
    }
    currentPageID : number
    setting       : {
        successAlram : boolean
        failAlram    : boolean
        alramSound   : string
    }
    menu: {
        items       : [Menu]
        sections    : [Section]
        opened      : boolean
        currentItem : number
    }
}

export type Button = "text" | "img";

export type PageID = number;
