import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    Switch,
} from 'react-native';

import {
    HeaderLayout,
    TextButton
} from '../components';

import {
    commonStyles,
    colors
} from '../static/styles';

import icons from '../icons';

import { pages } from '../static/app';

class SetupPage extends Component {
    constructor(props) {
        console.log('SetupPage constructor');
        super(props);
        let { store } = this.props
        this.state = {
            onAuthSuccess : store.getIn(['setting', 'alarm', 'onAuthSuccess']),
            onAuthFail    : store.getIn(['setting', 'alarm', 'onAuthFail']),
            onTempWarning : store.getIn(['setting', 'alarm', 'onTempWarning']),
            onNewUser     : store.getIn(['setting', 'alarm', 'onNewUser']),
        };
    }
    render() {
        let { menuActions, settingActions } = this.props.actions;
        let { show }                        = menuActions;
        let { setAlarmSetting }             = settingActions;
        let { setupPage }                   = pages;
        let { store }                       = this.props
        let {
            onAuthSuccess,
            onAuthFail,
            onTempWarning,
            onNewUser
        } = this.state;

        return (
            <HeaderLayout
                title={setupPage.title}
                leftIcon={icons.menu}
                onPressLeftIcon={show}
                style={[styles.layout]}
                >
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>인증 알림</Text>
                    <View style={[styles.optionBox]}>
                        <Switch
                            onValueChange={(onAuthSuccess) => {
                                this.setState({onAuthSuccess});
                                setAlarmSetting({onAuthSuccess})
                            }}
                            style={[styles.option]}
                            value={onAuthSuccess} />
                    </View>
                </View>
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>등록 알림</Text>
                    <View style={[styles.optionBox]}>
                        <Switch
                            onValueChange={(onNewUser) => {
                                this.setState({onNewUser});
                                setAlarmSetting({onNewUser})
                            }}
                            style={[styles.option]}
                            value={onNewUser} />
                    </View>
                </View>
                {/*
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>인증 실패시 알림</Text>
                    <View style={[styles.optionBox]}>
                        <Switch
                            onValueChange={(onAuthFail) => {
                                this.setState({onAuthFail});
                                setAlarmSetting({onAuthFail});
                            }}
                            style={[styles.option]}
                            value={onAuthFail} />
                    </View>
                </View>
                */}
                <View style={[styles.item]}>
                    <Text style={[styles.desc]}>고온 알림</Text>
                    <View style={[styles.optionBox]}>
                        <Switch
                            onValueChange={(onTempWarning) => {
                                this.setState({onTempWarning});
                                setAlarmSetting({onTempWarning});
                            }}
                            style={[styles.option]}
                            value={onTempWarning} />
                    </View>
                </View>
            </HeaderLayout>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        flex            : 1,
        justifyContent  : 'center',
    },
    item: {
        flexDirection : 'row',
        margin        : 10,
    },
    desc: {
        flex      : 1,
        fontSize  : 15,
        textAlign : 'right',
    },
    optionBox:{
        flex : 1,
    },
    option: {
        width: 50,
        marginLeft: 10,
    },
});

SetupPage.propTypes = {

}

SetupPage.defaultProps = {

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
export default createReduxComponent(SetupPage);
