import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ListView,
    ScrollView,
} from 'react-native';

import {
    HeaderLayout,
} from '../components';

import {
    commonStyles,
    colors
} from '../static/styles';

import icons from '../icons';

import { pages } from '../static/app';

//@TODO ScrollView를 ListView로 변경.

class UserListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount(){
        let { usersActions } = this.props.actions;
        usersActions.getUsers();
    }
    render() {
        let { menuActions }  = this.props.actions;
        let { show }         = menuActions;
        let { userListPage } = pages;
        let { store }        = this.props
        let users            = store.getIn(['users']).toJS();
        //let { }              = this.state;

        let usersTags = users.map(({name, registDate, latestAuthDate})=>(
            <View style={[styles.item]}>
                <Text style={[styles.name, styles.itemText]}>{name}</Text>
                <Text style={[styles.latestAuthDate, styles.itemText]}>{dateToString(new Date(latestAuthDate * 1000 ))}</Text>
            </View>
        ))

        users.forEach((user)=>{
            console.log('user', user);
        });

        return (
            <HeaderLayout
                title={userListPage.title}
                leftIcon={icons.menu}
                onPressLeftIcon={show}
                style={[styles.layout]}
                >
                <ScrollView style={[styles.list]}>
                    <View style={[styles.header]}>
                        <Text style={[styles.name, styles.headerText]}>이름</Text>
                        <Text style={[styles.latestAuthDate, styles.headerText]}>마지막인증</Text>
                    </View>
                    {usersTags}
                </ScrollView>

            </HeaderLayout>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        flex            : 1,
        justifyContent  : 'center',
    },
    list: {

    },
    header: {
        flexDirection   : 'row',
        justifyContent  : 'center',
        paddingTop      : 10,
        paddingBottom   : 10,
        backgroundColor : '#fbfdff',
    },
    headerText: {
        fontWeight        : 'bold',
    },
    item: {
        flexDirection     : 'row',
        justifyContent    : 'center',
        borderBottomWidth : 1,
        paddingTop        : 10,
        paddingBottom     : 10,
        borderColor       : colors.gary,
    },
    itemText:{

    },
    name: {
        flex : 1,
        textAlign :'center',
    },
    latestAuthDate: {
        flex : 2,
        textAlign :'center',
    }
});

UserListPage.propTypes = {

}

UserListPage.defaultProps = {

}

function dateToString(date){
    return `${date.getFullYear()}.${zeroFill(date.getMonth() + 1, 2)}.\
${zeroFill(date.getDate(), 2)} - ${zeroFill(date.getHours(), 2)}\
:${zeroFill(date.getMinutes(), 2)}`
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
export default createReduxComponent(UserListPage);
