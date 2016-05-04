# Smart Doorlock App
Door locks to control the application

## Tec
- React Native
- Redux
- Typescript
- TsLinter
- Gulp

## Component Structur
- App
  - Pages
    - FrontPage
    - HistoryPage
    - DetailPage
    - SearchPage
    - SearchResultPage

## Pages
### FrontPage
#### UI
##### 등록 전
![Imgur](http://i.imgur.com/tBv9tt6.png)
##### 등록 후
![Imgur](http://i.imgur.com/bNktgSD.png)
#### Structur
- Text
  - this.props.title
- TouchButton (등록하기) (등록후 숨김)
- TouchButton (출입기록) (등록전 숨김)
- TouchButton (등록해제) (등록전 숨김)

#### Property

#### Handler

### HistoryPage
#### UI
![Imgur](http://i.imgur.com/XbBgm4i.png)
#### Structur
- HeaderLayout
  - HistoryList

#### Property

#### Handler

### SearchPage
#### UI
![Imgur](http://i.imgur.com/MqDNPCe.png)
#### Structur
- HeaderLayout
  - View
    - Text
    - PeriodPicker
  - View
    - Text
    - Picker
  - View
    - Text
    - Picker
  - TouchButton (검색)

#### Property

#### Handler

### SearchResultPage
#### UI
![Imgur](http://i.imgur.com/5pQFNVU.png)
#### Structur
- HeaderLayout
  - HistoryList

#### Property

#### Handler

## Structur

### HistoryList
#### Structur

#### Property

#### Handler

### HistoryItem
#### Structur

#### Property

#### Handler

### TouchButton
#### Structur
  - TouchableHighlight
    - Text
      - this.props.value

#### Property

#### Handler

### HeaderLayout
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

#### Handler

### PeriodPicker
#### Structur

#### Property

#### Handler
