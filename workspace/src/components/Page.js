import React, {
    Component,
    PropTypes
} from 'react';

import {
    View
} from 'react-native';

import { commonStyles } from '../static/styles';

export class Page extends Component {
    render() {
        return (
            <View style={[commonStyles.base]}>
                {this.props.children}
            </View>
        );
    }
}

Page.propTypes = {
    id: PropTypes.number.isRequired
}

Page.defaultProps = {

}
