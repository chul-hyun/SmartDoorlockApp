import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

//import { } from '../components';

import {
    colors
} from '../static/styles';

import icons from '../icons';

//@TODO ScrollView를 ListView로 변경.

class HistoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount(){
    }
    render() {
        let { history } = this.props;
        let historyTags = history.map(({name, state, authtime, id})=>(
            <View style={[styles.item]} key={id}>
                <Text style={[styles.name, styles.itemText]}>{name}</Text>
                <Text style={[styles.authtime, styles.itemText]}>{dateToString(new Date(authtime * 1000 ))}</Text>
                <View style={styles.state}>
                    {(() => {
                    if(state === 'success') {
                        return <Image source={icons.unlock} style={styles.stateIcon} />
                    }else{
                        return <Image source={icons.error} style={styles.stateIcon} />
                    }
                    })()}
                </View>
            </View>
        ))

        history.forEach((history)=>{
            console.log('history', history);
        });

        return (
            <View
                style={[styles.layout]}
                >
                <View style={[styles.header]}>
                    <Text style={[styles.name, styles.headerText]}>이름</Text>
                    <Text style={[styles.authtime, styles.headerText]}>날짜</Text>
                    <Text style={[styles.state, styles.headerText]}>상태</Text>
                </View>
                <ScrollView style={[styles.list]}>
                    {historyTags}
                </ScrollView>
            </View>
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
        fontWeight : 'bold',
        textAlign  :'center'
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
        flex : 2,
        textAlign :'center',
    },
    state: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stateIcon: {
        width: 20,
        height: 20,
    },
    authtime: {
        flex : 2,
        textAlign :'center',
    }
});

HistoryList.propTypes = {
    history : PropTypes.array.isRequired
}

HistoryList.defaultProps = {

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

export default HistoryList;
