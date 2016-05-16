import React, {
    Component,
    PropTypes,
    View,
    Text
} from 'react-native';

export class MainPage extends Component {
    render() {
        let { title } = this.props;
        return (
            <View>
                <Text>{title}</Text>
                <Text>{'loading...'}</Text>
            </View>
        );
    }
}

MainPage.propTypes = {
    title      : PropTypes.string.isRequired,
}

MainPage.defaultProps = {

}
