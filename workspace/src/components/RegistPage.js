import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';

import {
    TextButton,
    Logo,
    TextInputLabel,
    RegistButton
 } from '../components';

import {
    commonStyles,
    doneColor
 } from '../static/styles';

export class RegistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            doorlockId : '',
            doorlockKey: ''
        };
    }
    render() {
        let { name, doorlockKey, doorlockId } = this.state;
        return (
            <View style={[commonStyles.base, styles.main]}>
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Logo />
                </View>
                <View style={[commonStyles.center, styles.inputBoxList]}>
                    <TextInputLabel
                        style={[commonStyles.center, styles.inputBox]}
                        onChangeText={(name) => this.setState({name})}>
                        {'이름'}
                    </TextInputLabel>
                    <TextInputLabel
                        style={[commonStyles.center, styles.inputBox]}
                        onChangeText={(doorlockId) => this.setState({doorlockId})}>
                        {'도어락 ID'}
                    </TextInputLabel>
                    <TextInputLabel
                        style={[commonStyles.center, styles.inputBox]}
                        onChangeText={(doorlockKey) => this.setState({doorlockKey})}>
                        {'도어락 Key'}
                    </TextInputLabel>
                </View>
                <View style={[commonStyles.center, styles.submitBox]}>
                    <RegistButton registInfo={{ name, doorlockId, doorlockKey }} />
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    main: {
        flex : 1,
        flexDirection : 'column',
    },
    titleBox: {
        flex : 2,
    },
    inputBoxList: {
        flex : 3,
        flexDirection : 'column',
    },
    submitBox: {
        flex : 1,
    },
    inputBox:{
        flex : 1,
        width: 250,
        flexDirection : 'row',
    },
    label: {
        flex : 2,
    },
    inputBorder:{
        flex : 5,
    },
    submit: {
        width: 150,
        height: 30,
        borderRadius: 10,
        fontSize: 15,
        backgroundColor: doneColor,
    }
});

RegistPage.propTypes = {

}

RegistPage.defaultProps = {

}
