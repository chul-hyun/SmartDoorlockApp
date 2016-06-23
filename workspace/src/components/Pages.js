import React, {
    Component,
    PropTypes
} from 'react';

import {
    View
} from 'react-native';

import { Page } from '../components/Page';
import { commonStyles } from '../static/styles';

export class Pages extends Component {
    render() {
        return (
            <View style={[commonStyles.base]}>
                {renderChildren(this.props)}
            </View>
        );
    }
}

Pages.propTypes = {
    currentPageId: PropTypes.number.isRequired
}

Pages.defaultProps = {

}

function renderChildren({ children, currentPageId }) {
    return React.Children.toArray(children).filter(({type, props}) => {
        if (type === Page && props.id == currentPageId ){
            return true;
        }
        return false;
    })
}
