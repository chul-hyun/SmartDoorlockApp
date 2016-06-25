import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    TextInput,
    Text,
    StyleSheet
} from 'react-native';

class TextInputLabel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }
    render() {
        let { style, onChangeText, children } = this.props;
        let { value } = this.state;
        return (
            <View style={[style]}>
                <Text style={[styles.label]}>{children}</Text>
                <View style={[styles.inputBorder]}>
                    <TextInput
                        value={value}
                        onChangeText={(value) => {
                            onChangeText(value);
                            this.setState({value});
                        }}
                    />
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    label: {
        flex : 2,
    },
    inputBorder:{
        flex : 5,
    }
});


TextInputLabel.propTypes = {

}

TextInputLabel.defaultProps = {

}

export default TextInputLabel;
