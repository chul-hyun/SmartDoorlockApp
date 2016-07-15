import React, {
    Component,
    PropTypes
} from 'react';

import {
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {
    TextButton
 } from '../components';

import {
    commonStyles,
    colors
 } from '../static/styles';
import * as staticStore from '../static/app';

class RegistButton extends Component {
    render() {
        let { getRegistInfo }  = this.props;
        let { userActions } = this.props.actions;
        let { regist }    = userActions;

        return (
            <TextButton
                onPress={()=> regist(getRegistInfo())}
                style={[styles.warp, styles.text]}
            >등록</TextButton>
        );
    }
}

const styles = StyleSheet.create({
    warp:{
        width: 150,
        height: 30,
        borderRadius: 10,
        backgroundColor: colors.doneColor
    },
    text: {
        fontSize: 15,
    }
});

RegistButton.propTypes = {

}

RegistButton.defaultProps = {

}

import createReduxComponent from '../containers/createReduxComponent';
export default createReduxComponent(RegistButton);
