import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class InitPage extends Component {
    render() {
        let { title, onStart } = this.props;
        return (
            <View>
                <Text>{title}</Text>
                <TouchButton value={'시작하기'} onPress={onStart}></TouchButton>
            </View>
        );
    }
}

InitPage.propTypes = {
    title   : PropTypes.string.isRequired,
    onStart : PropTypes.func
}

InitPage.defaultProps = {

}
