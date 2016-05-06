# Smart Doorlock App
Door locks to control the application

## Preview
[view](https://appetize.io/embed/qwbfgvuq39h0bhyhdfteuqrurw?device=nexus5&scale=75&orientation=portrait&osVersion=6.0)

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
        "name"       : "string",
        "key"        : "number",
    },
    "histories" : [{
        "datetime": "number",
        "state"   : "boolean",
        "name"    : "string",
        "id"      : "number",
    }, ...],
    "userNames": [..."string"],
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
- Pages (currentPageId = 0)
  - Page (id = 0)
      - FrontPage (
          title = 'Smart Doorlock',
          registered = store.user.registered, registHandler = 우선 임시로 store.user.registered = true로 설정
          unregistHandler = 우선 임시로 store.user.registered = false로 설정
          goHistoryPageHandler = go history page)
  - Page (id = 1)
      - HistoryPage (
           histories = store.histories, backPageHandler = go pre page, searchPageHandler = go search page)
  - Page (id = 2)
      - SearchPage (
          histories = store.histories,
          userNames = store.userNames,
          backPageHandler = go pre page,
          searchHandler = set SearchResultPage.props.histories and go search result page)
  - Page (id = 3)
      - SearchResultPage (
          histories = SearchPage.props.searchHandler 에 의해 설정됨,
          backPageHandler = go pre page,
          searchPageHandler = go search page)

#### Property
- title:string:required

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
- indexPageId:number:required

#### State
- currentPageId:number

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
![Imgur](http://i.imgur.com/tBv9tt6.png)
##### 등록 후
![Imgur](http://i.imgur.com/bNktgSD.png)
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
![Imgur](http://i.imgur.com/XbBgm4i.png)
#### Structur
- HeaderLayout (title = '출입기록',
    rightIcon = 'search.png',
    leftIcon = 'back.png', rightIconTouchHandler =  this.props.searchPageHandler ,
    leftIconTouchHandler = this.props.backPageHandler)
  - HistoryList (histories = this.props.histories )

#### Property
- histories:[]:[]

#### State
- 없음

#### Handler
- searchPageHandler
- backPageHandler

---
### SearchPage
#### UI
![Imgur](http://i.imgur.com/Ngd3rFZ.png)
#### Structur
- HeaderLayout (title = '검색',
leftIcon = 'back.png',
leftIconTouchHandler = this.props.backPageHandler)
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
- histories
- userNames

#### State
- startTime
- endTime
- searchName

#### Handler
- backPageHandler
- searchHandler:(result:[])
    - 검색시 검색 결과를 매개변수로 보냄.

---
### SearchResultPage
#### UI
![Imgur](http://i.imgur.com/5pQFNVU.png)
#### Structur
- HeaderLayout (
    title = '검색결과',
    rightIcon = 'search.png',
    leftIcon = 'back.png', rightIconTouchHandler =  this.props.searchPageHandler ,
    leftIconTouchHandler = this.props.backPageHandler)
  - HistoryList (histories = this.props.histories )

#### Property
- histories:[]:[]

#### State
- 없음

#### Handler
- backPageHandler
- searchPageHandler

---
### HistoryList
#### UI
![Imgur](http://i.imgur.com/Ld5mzYp.png)

#### Structur
- ListView ( ... )

#### Property
- histories:[{datetime, name}]:[]

#### State
- 없음

#### Handler
- 없음

---
### HistoryItem
#### UI
![Imgur](http://i.imgur.com/f554Jar.png)

#### Structur
- View
    - Text
        - printDatetime(datetime)
    - Text
        - name

#### Property
- datetime:number
- name:string

#### State
- 없음

#### Handler
- 없음

---
### TouchButton
#### UI
![Imgur](http://i.imgur.com/7dOIqf2.png)
![Imgur](http://i.imgur.com/W2xWk4Y.png)

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
### HeaderLayout
#### UI
![Imgur](http://i.imgur.com/JZ12jkL.png)

#### Structur
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
- rightIconTouchHandler
- leftIconTouchHandler

---
### PeriodPicker
#### UI
![Imgur](http://i.imgur.com/0XCZOR7.png)

#### Structur

#### Property
- startTime:number
- endTime:number

#### State
- 없음

#### Handler
- changeTimeHandler

# TODO LIST
- [ ] Action, Reducer 설계
- [ ] 인증의 성공과 실패부분을 히스토리 UI에서 볼수있도록
