# Smart Doorlock App
Door locks to control the application

## Server Part
[github](https://github.com/MuteInspiration/graduation_Univ_DoorLock)

## Preview
[view](https://appetize.io/embed/qwbfgvuq39h0bhyhdfteuqrurw?device=nexus5&scale=75&orientation=portrait&osVersion=6.0)

## TODO LIST
- [ ] Action, Reducer 설계
- [ ] 인증의 성공과 실패부분을 히스토리 UI에서 볼수있도록
- [ ] 설계에 변경된 UI를 적용
- [ ] HeaderLayout와 sideMenu의 통합고려
- [ ] MyPage 설계
- [ ] 핸들러는 store값을 바꾸게.. 설계 (정방향으로..;;)
- [ ] Action을 모두 root태그에서 처리하는게 옳은가?
- [ ] Store -> State를 모두 root태그에서 처리 및 전달하는게 옳은가?


## Tec
- React Native
- Redux
- Typescript
- TsLinter
- Gulp

## Types
- AuthStateType
    ```
    "success" | "fail": required
    ```
- HistoryType
    ```
    {
        "datetime": "number": required,
        "state"   : AuthStateType : required,
        "name"    : "string": required
    }
    ```
- UserInfoType
    ```
    {
        "registDate"     : "date": required,
        "latestAuthDate" : "date": required,
        "name"           : "string": required,
        "key"            : "number": -1, /* 인증키 */
    }
    ```
- MenuType
    ```
    {
        "icon"  : "string" | null : null,
        "name"  : "string": required,
        "id"    : "number" : required
    }
    ```
- SectionType
    ```
    {
        "title": "string": required,
        "menus": ["number", ...]: []
    }
    ```
- PageType
    ```
    {
        "title": "string": required,
        "id": "number": required
    }
    ```
- SearchFilterType
    ```
    {
        "startTime": "number" : -1,
        "endTime" : "number" : -1,
        "user": "string" | null : null,
        "state": AuthStateType
    }
    ```


## Store Structur
```json
{
    "static": {
        "title": "Smart Doorlock",
        "menus": [MenuType],
        "sections": [SectionType],
        "pages": {
            "pageName":PageType, ...
        },
        "indexMenu": "number"
    },
    "user": UserInfoType,
    "registered": "boolean",
    "histories" : [historyType],
    "users": [UserInfoType],
    "search": {
        "filter": SearchFilterType,
        "result" : [historyType]
    }
    "currentPageID": "number"
}
```

## Reducer Structur
```json
{
    "static",
    "user",
    "histories",
    "users",
    "search",
    "currentPageID"
}
```

## Action Types
- REGISTER
- UNREGISTER
- SET_PAGE
- OPEN_MENU
- SEARCH
- UNLOCK
- SET_ALARM
- SET_ALARM_SOUND
- SET_NAME



## Action List
- register()
    - 우선 임시로 store.registered = true로 설정
- unregister()
    - 우선 임시로 store.registered = false로 설정
- setPage(pageID:number)
- openMenu()
- search(filter:{})
- unlock()
- setAlarm({"success", "fail"})
- setAlarmSound()
- setName()

## Containers

### App
#### UI
- 없음

#### Structur
- View
    - SideMenu
    ```
    title = Store.static.title
    menus = Store.static.menus를 변환한 값
    sections = Store.static.sections
    selectedMenu = Store.static.indexMenu
    onPressMenu = Action.setPage()
    ```
    - Pages
    ```
    currentPageID = Store.currentPageID
    ```
        - Page
        ```
        id = Store.static.pages.InitPage.id
        ```
            - InitPage
            ```
            title = Store.static.title
            onRegister = Action.register()
            ```
        - Page
        ```
        id = Store.static.pages.MainPage.id
        ```
            - MainPage
            ```
            title = Store.static.title
            onOpenMenu = Action.openMenu()
            onUnlock = Action.unlock()
            ```
        - Page
        ```
        id = Store.static.pages.HistoryPage.id
        ```
            - HistoryPage
            ```
            title = Store.static.pages.HistoryPage.title
            histories = store.histories
            onOpenMenu = Action.openMenu()
            onGoSearchPage = Action.setPage(Store.static.pages.SearchPage.id)
            ```
        - Page
        ```
        id = Store.static.pages.SearchPage.id
        ```
            - SearchPage
            ```
            title = Store.static.pages.SearchPage.title
            users = store.users
            searchFilter = Store.search.filter
            onOpenMenu = Action.openMenu()
            onSearch = Action.search()
            ```
        - Page
        ```
        id = Store.static.pages.SearchResultPage.id
        ```
            - SearchResultPage
            ```
            title = Store.static.pages.SearchResultPage.title
            histories = Store.search.result
            onOpenMenu = Action.openMenu()
            onGoSearchPage = Action.setPage(Store.static.pages.SearchPage.id)
            ```
        - Page
        ```
        id = Store.static.pages.SetupPage.id
        ```
            - SetupPage
            ```
            title = Store.static.pages.SetupPage.title
            onOpenMenu = Action.openMenu()
            setAllAlarmHandler = Action.setAlarm()
            setFailAlarmHandler = Action.setAlarm()
            setAlarmSoundHandler = Action.setAlarmSound()
            ```
         - Page
         ```
         id = Store.static.pages.MyPage.id
         ```
            - MyPage
            ```
            title = Store.static.pages.MyPage.title
            onOpenMenu = Action.openMenu()
            name = Store.user.name
            registDate = Store.user.registDate
            latestAuthDate = Store.user.latestAuthDate
            changeNameHandler = Action.setName()
            onUnregister = Action.unregister()
            ```
        - Page
        ```
        id = Store.static.pages.UserListPag.id
        ```
            - UserListPage
            ```
            title = Store.static.pages.UserListPage.title
            onOpenMenu = Action.openMenu()
            ```

#### Property
- title:string:required

#### State
- 없음

#### Handler
- 없음


## Components

### SideMenu
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/SideMenu.PNG)

#### Structur
- DrawerLayoutAndroid
    - View
        - Text
    - View
        - Text
            - sections.title
        - View
            - TouchableHighlight
            ```
            onPress = onPressMenu
            ```
                - Image
                - Text
            - ...

Property 들을 이용해서 구축

#### Property
- title:string
- menus:[MenuType]
- sections:[SectionType]
- selectedMenu:number

#### State
- 없음

#### Handler
- onPressMenu:(menu.id)=>void

---
### Pages
#### UI
- 없음

#### Structur
- View

#### Property
- currentPageID:number:required

#### State
- pageHisotry:[]

#### Handler
- onChangePage

---
### Page
#### UI
- 없음

#### Structur
- View

#### Property
- id:number:required

#### State
- 없음

#### Handler
- 없음

---
### InitPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/InitPage.PNG)
#### Structur
- View
    - Text
        - this.props.title
    - TouchButton
    ```
    value = '등록하기'
    onPress = this.props.onRegister
    ```

#### Property
- title:string:required

#### State
- 없음

#### Handler
- onRegister

---
### MainPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/MainPage.PNG)
#### Structur
- View
    - View
        - TouchButton
        ```
        value = 'menu.png'
        type = 'img'
        onPress = this.props.onOpenMenu
        ```
    - Text
        - this.props.title
    - View
        - TouchButton
        ```
        value = 'unlock.png'
        type = 'img'
        onPress = this.props.onUnlock
        ```

#### Property
- title:string:required

#### State
- 없음

#### Handler
- onOpenMenu
- onUnlock

---
### HistoryPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HistoryPage.PNG)
#### Structur
- HeaderLayout
```
title = this.props.title
leftIcon = 'menu.png'
rightIcon = 'search.png'
onPressLeftIcon =  this.props.onOpenMenu
onPressRightIcon =  this.props.onGoSearchPage
```
    - HistoryList
    ```
    histories = this.props.histories
    ```

#### Property
- title:string:required
- histories:[HistoryType]:[]

#### State
- 없음

#### Handler
- onOpenMenu
- onGoSearchPage

---
### SearchPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/SearchPage.PNG)
#### Structur
- HeaderLayout
```
title = this.props.title
onPressLeftIcon =  this.props.onOpenMenu
leftIcon = 'back.png'
```
    - View
        - Text
            - "기간"
        - PeriodPicker
        ```
        onChangeTime= this.props.onChangeSearchOptions
        startTime = this.props.searchFilter.startTime
        endTime = this.props.searchFilter.endTime
        ```
    - View
        - Text
            - "이름"
        - Picker
        ```
        selectedValue = this.props.searchFilter.user
        onValueChange= this.props.onChangeSearchOptions
        ```
            - Picker.item (users를 mapping)
    - View
        - Text
            - "상태"
        - Picker
        ```
        selectedValue = this.props.searchFilter.state
        onValueChange= this.props.onChangeSearchOptions
        ```
            - Picker.item
                - "모든상태"
            - Picker.item
                - "인증성공"
            - Picker.item
                - "인증실패"
    - TouchButton
    ```
    value = '검색'
    onPress = this.props.onSearch
    ```

#### Property
- title:string:required
- users:[UserInfoType]:required
- searchFilter:SearchFilterType:required

#### State
- 없음

#### Handler
- onOpenMenu
- onChangeSearchOptions
- onSearch
    - 검색 옵션을 매개변수로 보냄

---
### SearchResultPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/SearchResultPage.PNG)
#### Structur
- HeaderLayout
```
title = this.props.title
rightIcon = 'search.png'
leftIcon = 'back.png'
onPressRightIcon =  this.props.onGoSearchPage
onPressLeftIcon =  this.props.onOpenMenu
```
    - HistoryList
    ```
    histories = this.props.histories
    ```

#### Property
- title:string:required
- histories:[HistoryType]:[]

#### State
- 없음

#### Handler
- onOpenMenu
- onGoSearchPage

---
### HistoryList
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HistoryList.PNG)

#### Structur
- ListView ( histories를 맵핑 )

#### Property
- histories:[HistoryType]:[]

#### State
- 없음

#### Handler
- 없음

---
### HistoryItem
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HistoryItem.PNG)

#### Structur
- View
    - Text
        - name
    - Text
        - printDatetime(datetime)
    - View
        - Image (상태에 따라 다른 이미지)

#### Property
- name:string
- datetime:number
- state:AuthStateType

#### State
- 없음

#### Handler
- 없음

---
### TouchButton
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/TouchButton1.PNG)
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/TouchButton2.PNG)
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/TouchButton3.PNG)

#### Structur

##### type == "text"
- TouchableHighlight
```
onPress = this.props.onPress
```
    - Text
        - this.props.value

##### type == "text"
- TouchableHighlight
```
onPress = this.props.onPress
```
    - Image
    ```
    source={require(this.props.value)}
    ```

#### Property
- value:string:required
- onPress
- type:"text | img":"text"

#### State
- 없음

#### Handler
- clickHandler

---
### HeaderSideMenuLayout
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HeaderLayout.PNG)

#### Structur
- HeaderLayout
    - DrawerLayoutAndroid
    - View
        - Image
    - View
        - Text
    - View
        - Image
    - View
        - this.props.children

#### Property
- title:string
- rightIcon:string(img URL)
- menus

#### State
- 없음

#### Handler
- onPressRightIcon

---
### HeaderLayout
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HeaderLayout.PNG)

#### Structur
- View
    - View
        - Image
    - View
        - Text
    - View
        - Image
    - View
        - this.props.children

#### Property
- title:string
- rightIcon:string(img URL)
- leftIcon:string(img URL)

#### State
- 없음

#### Handler
- onPressRightIcon
- onPressLeftIcon

---
### PeriodPicker
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/PeriodPicker.PNG)

#### Structur

#### Property
- startTime:number
- endTime:number

#### State
- 없음

#### Handler
- onChangeTime
