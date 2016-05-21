import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class UserListPage extends Component {
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

UserListPage.propTypes = {
    title      : PropTypes.string.isRequired,
    onShowMenu : PropTypes.func
}

UserListPage.defaultProps = {

}
