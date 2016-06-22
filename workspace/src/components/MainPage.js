import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class MainPage extends Component {
    render() {
        let { title, onUnlock, onShowMenu } = this.props;
        return (
            <View>
                <View>
                    <TouchButton value={'menu.png'} onPress={onShowMenu}></TouchButton>
                </View>
                <View>
                    <Text>{title}</Text>
                    <TouchButton value={'unlock.png'} onPress={onUnlock}></TouchButton>
                </View>
            </View>
        );
    }
}

MainPage.propTypes = {
    title      : PropTypes.string.isRequired,
    onShowMenu : PropTypes.func,
    onUnlock   : PropTypes.func
}

MainPage.defaultProps = {

}
