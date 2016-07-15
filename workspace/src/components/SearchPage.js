import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    Image,
    Picker,
    DatePickerAndroid,
    TouchableHighlight,
    StyleSheet,
} from 'react-native';

import {
    HeaderLayout,
    TextButton,
} from '../components';

import {
    commonStyles,
    colors
} from '../static/styles';

import icons from '../icons';

import { pages } from '../static/app';

class SearchPage extends Component {
    constructor(props) {
        super(props);
        let { store } = this.props
        let today     = new Date();
        let startDate = store.getIn(['search', 'filter', 'startDate']);
        let endDate   = store.getIn(['search', 'filter', 'endDate']);

        this.state = {
            startDate   : (startDate == null ) ? today : startDate,
            endDate     : (endDate == null ) ? today : endDate,
            userID      : store.getIn(['search', 'filter', 'userID']),
            searchState : store.getIn(['search', 'filter', 'searchState']),
        };
    }
    componentWillMount(){
        let { usersActions } = this.props.actions;
        usersActions.getUsers();
    }

    async showPicker() {
        console.log('showPicker');
        try{
            let Today     = new Date();
            let Tomorrow  = new Date();

            const startDateObj = await DatePickerAndroid.open({
                date    : this.state.startDate,
                maxDate : Today,
            });
            if (startDateObj.action === DatePickerAndroid.dismissedAction) {
                return;
            }
            let startDate = objToDate(startDateObj);

            const endDateObj = await DatePickerAndroid.open({
                date    : startDate,
                minDate : startDate,
                maxDate : Today,
            })
            if (endDateObj.action === DatePickerAndroid.dismissedAction) {
                return;
            }
            let endDate = objToDate(endDateObj);

            this.setState({startDate, endDate});
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    render() {
        let { menuActions, searchActions, pageActions } = this.props.actions;
        let { searchPage, searchResultPage }            = pages;

        let { search }  = searchActions;
        let { show }    = menuActions;
        let { setPage } = pageActions;
        let { store }   = this.props
        let users       = store.getIn(['users']).toJS();

        let {
            startDate,
            endDate,
            userID,
            searchState,
        } = this.state;

        console.log('this.state', this.state);

        let usersTags = users.map(({id, name, registDate, latestAuthDate})=>(
            <Picker.Item style={[styles.optionText]} label={`${name}(${id})`} value={id} key={id} />
        ));
        usersTags.unshift(<Picker.Item style={[styles.optionText]} label="모든사용자" value={-1} key={-1} />)

        return (
            <HeaderLayout
                title={searchPage.title}
                leftIcon={icons.menu}
                onPressLeftIcon={show}
                style={[styles.layout]}
                >
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>기간</Text>
                    <TouchableHighlight
                        onPress={()=>this.showPicker()}>
                        <View style={[styles.optionBox, styles.textBox]}>
                            <Text style={[styles.optionText]}>{`${dateToString(startDate)} - ${dateToString(endDate)}`}</Text>
                            <Image source={icons.date} style={styles.dateIcon} />
                        </View>
                    </TouchableHighlight>
                </View>
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>이름</Text>
                    <View style={[styles.optionBox]}>
                        <Picker
                        selectedValue={userID}
                        onValueChange={(userID) => this.setState({userID})}
                        style={[styles.option]}>
                            {usersTags}
                        </Picker>
                    </View>
                </View>
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>상태</Text>
                    <View style={[styles.optionBox]}>
                        <Picker
                        selectedValue={searchState}
                        onValueChange={(searchState) => this.setState({searchState})}
                        style={[styles.option]}>
                            <Picker.Item style={[styles.optionText]} label="모든상태" value={false} />
                            <Picker.Item style={[styles.optionText]} label="인증성공" value="success" />
                            {/*<Picker.Item style={[styles.optionText]} label="인증실패" value="fail" />*/}
                            <Picker.Item style={[styles.optionText]} label="이상온도" value="warning" />
                        </Picker>
                    </View>
                </View>
                <View style={[styles.buttonBox]}>
                    <TextButton
                        style={[styles.button]}
                        onPress={()=>{
                            search({startDate, endDate, userID, searchState});
                            setPage(searchResultPage.id);
                        }
                    }>검색</TextButton>
                </View>
            </HeaderLayout>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        flex           : 1,
        justifyContent : 'center',
        alignSelf      : 'center',
    },
    item: {
        flexDirection : 'row',
        margin        : 10,
    },
    desc: {
        flex        : 1,
        fontSize    : 15,
        marginRight : 10,
        textAlign   : 'right',
        alignSelf   : 'center',
        fontWeight  : 'bold',
    },
    optionBox: {
        flex           : 1,
        width          : 200,
        alignSelf      : 'center',
        justifyContent : 'center',
        borderWidth    : 1,
        borderColor    : colors.gary,
        height         : 50,
    },
    option: {
    },
    optionText:{
        fontSize    : 13,
        fontWeight  : 'bold',
    },
    dateIcon: {
        width  : 20,
        height : 20,
        marginLeft  : 10,
    },
    textBox : {
        flex           : 1,
        flexDirection  : 'row',
        justifyContent : 'center',
        alignItems     : 'center',
    },
    buttonBox: {
        flexDirection  : 'row',
        justifyContent : 'center',
        marginTop       : 20,
        marginBottom    : 20,
    },
    button: {
        width           : 100,
        height          : 30,
        elevation       : 1,
        marginLeft      : 10,
        marginRight     : 10,
        backgroundColor : colors.doneColor,
    }
});

SearchPage.propTypes = {

}

SearchPage.defaultProps = {

}

function objToDate(obj){
    return new Date(obj.year, obj.month, obj.day);
}

function dateToString(date){
    return `${date.getFullYear()}.${zeroFill(date.getMonth() + 1, 2)}.${zeroFill(date.getDate(), 2)}`
}

function zeroFill(number, n){
    n -= number.toString().length;
    if ( n > 0 )
    {
        return new Array( n + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

import createReduxComponent from '../containers/createReduxComponent';
export default createReduxComponent(SearchPage);
