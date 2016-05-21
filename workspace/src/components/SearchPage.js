import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class SearchPage extends Component {
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

SearchPage.propTypes = {
    title      : PropTypes.string.isRequired,
    onShowMenu : PropTypes.func
}

SearchPage.defaultProps = {

}
