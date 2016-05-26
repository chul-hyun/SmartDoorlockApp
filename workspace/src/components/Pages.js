import React, {
    Component,
    View,
    PropTypes
} from 'react-native';

import { Page } from '../components/Page';

export class Pages extends Component {
    render() {
        return (
            <View>
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
