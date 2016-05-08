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


## Tec
- React Native
- Redux
- Typescript
- TsLinter
- Gulp

## Store Structur
```json
{
    "user": {
        "registered" : "boolean",
        "registDate" : "date",
        "name"       : "string",
        "key"        : "number",
    },
    "histories" : [{
        "datetime": "number",
        "state"   : "boolean",
        "name"    : "string",
        "id"      : "number",
    }, ...],
    "userNames": [{"name": "string", "registDate": "date"}, ...],
}
```

## Const Store
```json
{
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
}
```

## Action Types
- actionTypeA

## Action List

## Reducer Structur

## Reducer List
- reducerA

## Components

### App
#### UI
- 없음

#### Structur
- View
    - SideMenu (
        title = ConstStore.title,
        menus = ConstStore.menus를 변환한 값,
        sections = ConstStore.sections,
        selectedMenu = ConstStore.indexMenu )
    - Pages (currentPageId = ConstStore.menus[ConstStore.indexMenu].pageID)
      - Page ( id = ConstStore.pages.FrontPage.id )
          - FrontPage (
              title = ConstStore.title,
              registered = store.user.registered,
              registHandler = 우선 임시로 store.user.registered = true로 설정,
              unregistHandler = 우선 임시로 store.user.registered = false로 설정,
              goHistoryPageHandler = go history page)
      - Page ( id = ConstStore.pages.HistoryPage.id )
          - HistoryPage (
              title = ConstStore.pages.HistoryPage.title,
              histories = store.histories,
              goBackPageHandler = go pre page, goSearchPageHandler = go search page)
      - Page ( id = ConstStore.pages.SearchPage.id )
          - SearchPage (
              title = ConstStore.pages.SearchPage.title,
              histories = store.histories,
              userNames = store.userNames,
              goBackPageHandler = go pre page,
              searchHandler = set SearchResultPage.props.histories and go search result page)
      - Page ( id = ConstStore.pages.SearchResultPage.id )
          - SearchResultPage (
              title = ConstStore.pages.SearchResultPage.title,
              histories = SearchPage.props.searchHandler 에 의해 설정됨,
              goBackPageHandler = go pre page,
              goSearchPageHandler = go search page)

#### Property
- title:string:required

#### State
- 없음

#### Handler
- 없음

---
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
- currentPageId:number:required

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
        - Picker.item (userNames를 mapping)
  - TouchButton (value = '검색')

#### Property
- title:string:required
- histories
- userNames

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
