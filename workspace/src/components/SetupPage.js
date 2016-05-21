import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class SetupPage extends Component {
    render() {
        let { title, onShowMenu } = this.props;
        return (
            <View>
                <View>
                    <Text>{title}</Text>
                </View>
                <View>
                    <TouchButton value={'menu.png'} onPress={onShowMenu}></TouchButton>
                </View>
            </View>
        );
    }
}

SetupPage.propTypes = {
    title      : PropTypes.string.isRequired,
    onShowMenu : PropTypes.func
}

SetupPage.defaultProps = {

}
