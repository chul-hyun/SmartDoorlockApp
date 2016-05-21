import React, {
    Component,
    PropTypes,
    View
} from 'react-native';

export class Page extends Component {
    render() {
        return (
            <View>
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
