import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class MainPage extends Component {
    render() {
        let { title, onUnlock, onOpenMenu } = this.props;
        return (
            <View>
                <View>
                    <TouchButton value={'menu.png'} onPress={onOpenMenu}></TouchButton>
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
    onOpenMenu : PropTypes.func,
    onUnlock   : PropTypes.func
}

MainPage.defaultProps = {

}
