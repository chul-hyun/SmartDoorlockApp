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

## Store Structur
```json
{
    "static": {
        "title": "Smart Doorlock",
        "menus": [{
            "icon"  : "string",
            "name"  : "string",
            "pageID": "number"
        }],
        "sections": [{
            "title": "string",
            "menus": ["number", ...]
        }],
        "pages": {
            "pageName":{
                "title": "string",
                "id": "number"
            }
        },
        "indexMenu": "number"
    },
    "user": {
        "registered"     : "boolean",
        "registDate"     : "date",
        "latestAuthDate" : "date",
        "name"           : "string",
        "key"            : "number", /* 인증키 */
    },
    "histories" : [{
        "datetime": "number",
        "state"   : "boolean",
        "name"    : "string"
    }, ...],
    "users": [{
        "name": "string",
        "registDate": "date",
        "latestAuthDate" : "date"
    }, ...],
    "search": {
        "filter": {
            "startTime": "number",
            "endTime" : "number",
            "user": "string",
            "state": "success | fail"
        },
        "result" : [{
            "datetime": "number",
            "state"   : "boolean",
            "name"    : "string"
        }, ...]
    }
    "currentPageID": "number"
}
```

## Action Types
- REGISTER
- UNREGISTER
- SET_PAGE
- SEARCH


## Action List
- register()
    - 우선 임시로 store.user.registered = true로 설정
- unregister()
    - 우선 임시로 store.user.registered = false로 설정
- setPage(pageID:number)
- openMenu()
- search(filter: {})


## Reducer Structur

## Reducer List
- reducerA

## Containers

### App
#### UI
- 없음

#### Structur
- View
    - SideMenu (
        title = Store.static.title,
        menus = Store.static.menus를 변환한 값,
        sections = Store.static.sections,
        selectedMenu = Store.static.indexMenu )
    - Pages (currentPageID = Store.currentPageID)
        - Page ( id = Store.static.pages.FrontPage.id )
            - FrontPage (
                title = Store.static.title,
                registered = store.user.registered,
                registHandler = Action.register(),
                unregistHandler = Action.unregister(),
                goHistoryPageHandler = Action.setPage(Store.static.pages.HistoryPage.id))
        - Page ( id = Store.static.pages.HistoryPage.id )
            - HistoryPage (
                title = Store.static.pages.HistoryPage.title,
                histories = store.histories,
                openMenuHandler = Action.openMenu(), goSearchPageHandler = Action.setPage(Store.static.pages.SearchPage.id))
        - Page ( id = Store.static.pages.SearchPage.id )
            - SearchPage (
                title = Store.static.pages.SearchPage.title,
                histories = store.histories,
                users = store.users,
                openMenuHandler = Action.openMenu(),
                searchHandler = Action.search())
        - Page ( id = Store.static.pages.SearchResultPage.id )
            - SearchResultPage (
                title = Store.static.pages.SearchResultPage.title,
                histories = Store.search.result,
                openMenuHandler = Action.openMenu(),
                goSearchPageHandler = Action.setPage(Store.static.pages.SearchPage.id))
        - Page ( id = Store.static.pages.SetupPage.id )
            - SetupPage(

                title = Store.static.pages.SetupPage.title,
                 )
        - Page ( id = Store.static.pages.MyPage.id )
            - MyPage(
                title = Store.static.pages.MyPage.title,
                name = Store.user.name,
                registDate = Store.user.registDate,
                latestAuthDate = Store.user.latestAuthDate,
                changeNameHandler = ,
                unregistHandler = )

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
        - TouchableHighlight
            - Image
            - Text
        - ...

#### Property
- title:string
- menus:
```json
[{
    "icon"        : "string",
    "name"        : "string",
    "touchHandler": "function"
}, ...]
```
- sections
```json
[{
    "title": "string",
    "menus": ["number", ...]
}]
```
- selectedMenu:number

#### State
- 없음

#### Handler
- 없음

---
### Pages
#### UI
- 없음

#### Structur
- View

#### Property
- currentPageID:number:required

#### State
- 없음

#### Handler
- 없음

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
### FrontPage
#### UI
##### 등록 전
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/FrontPage1.PNG)
##### 등록 후
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/FrontPage2.PNG)
#### Structur
- Text
  - this.props.title
  - TouchButton (value = '등록하기') (등록후 숨김)
  - TouchButton (value = '출입기록') (등록전 숨김)
  - TouchButton (value = '등록해제') (등록전 숨김)

#### Property
- registered:boolean:required
- title:string:required

#### State
- 없음

#### Handler
- registHandler
- unregistHandler
- goHistoryPageHandler

---
### HistoryPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HistoryPage.PNG)
#### Structur
- HeaderLayout (title = this.props.title,
    rightIcon = 'search.png',
    leftIcon = 'menu.png', touchRightIconHandler =  this.props.goSearchPageHandler)
  - HistoryList (histories = this.props.histories )

#### Property
- title:string:required
- histories:[]:[]

#### State
- 없음

#### Handler
- goSearchPageHandler

---
### SearchPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/SearchPage.PNG)
#### Structur
- HeaderLayout (
    title = this.props.title,
    leftIcon = 'back.png')
  - View
    - Text
    - PeriodPicker
  - View
    - Text
    - Picker (
        selectedValue = this.state.searchName,
        onValueChange= (searchName) => this.setState({searchName: searchName}))
        - Picker.item (users를 mapping)
  - TouchButton (value = '검색')

#### Property
- title:string:required
- histories
- users

#### State
- startTime
- endTime
- searchName

#### Handler
- searchHandler:(result:[])
    - 검색시 검색 결과를 매개변수로 보냄.

---
### SearchResultPage
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/SearchResultPage.PNG)
#### Structur
- HeaderLayout (
    title = this.props.title,
    rightIcon = 'search.png',
    leftIcon = 'back.png', touchRightIconHandler =  this.props.goSearchPageHandler)
  - HistoryList (histories = this.props.histories )

#### Property
- title:string:required
- histories:[]:[]

#### State
- 없음

#### Handler
- goSearchPageHandler

---
### HistoryList
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/HistoryList.PNG)

#### Structur
- ListView ( ... )

#### Property
- histories:[{name, datetime}]:[]

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

#### Property
- name:string
- datetime:number

#### State
- 없음

#### Handler
- 없음

---
### TouchButton
#### UI
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/TouchButton1.PNG)
![UI](https://raw.githubusercontent.com/qkrcjfgus33/SmartDoorlockApp/master/UI/TouchButton2.PNG)

#### Structur
  - TouchableHighlight
    - Text
      - this.props.value

#### Property
- value:string

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
- touchRightIconHandler

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
- touchRightIconHandler
- touchLeftIconHandler

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
- changeTimeHandler
