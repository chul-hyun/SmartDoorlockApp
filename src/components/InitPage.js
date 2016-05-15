import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class InitPage extends Component {
    render() {
        let { title, onRegister } = this.props;
        return (
            <View>
                <Text>{title}</Text>
                <TouchButton value={'등록하기'} onPress={onRegister}></TouchButton>
            </View>
        );
    }
}

InitPage.propTypes = {
    title      : PropTypes.string.isRequired,
    onRegister : PropTypes.func
}

InitPage.defaultProps = {

}
