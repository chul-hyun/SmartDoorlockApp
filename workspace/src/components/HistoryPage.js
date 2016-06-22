import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class HistoryPage extends Component {
    render() {
        let { title, onShowMenu } = this.props;
        return (
            <View>
                <View>
                    <Text>{title}</Text>
                </View>
                <View>
                    <TouchButton value={'menu.png'} onPress={onShowMenu} />
                </View>
            </View>
        );
    }
}

HistoryPage.propTypes = {
    title      : PropTypes.string.isRequired,
    onShowMenu : PropTypes.func
}

HistoryPage.defaultProps = {

}
