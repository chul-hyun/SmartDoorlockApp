import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

export class InitPage extends Component {
    render() {
        console.log(this.props.currentPageID);
        return (
            <View>
                <Text></Text>
                <TouchButton></TouchButton>
            </View>
        );
    }
}

InitPage.propTypes = {
    id: PropTypes.number.isRequired
}

InitPage.defaultProps = {

}
