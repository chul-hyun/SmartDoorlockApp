import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text
} from 'react-native';

export class LoadingPage extends Component {
    render() {
        let { title } = this.props;
        return (
            <View>
                <Text>{title}</Text>
                <Text>{'loading image...'}</Text>
            </View>
        );
    }
}

LoadingPage.propTypes = {
    title      : PropTypes.string.isRequired,
}

LoadingPage.defaultProps = {

}
