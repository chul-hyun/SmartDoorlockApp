import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

class TextButton extends Component {
    render() {
        let { children, onPress, style, underlayColor } = this.props;

        style = StyleSheet.flatten([style]);

        let {
            width,
            height,
            borderWidth,
            borderRadius,
            backgroundColor,
            fontSize,
            flex,
            elevation,
        } = style;

        let wrapStyle = {
            width,
            height,
            borderWidth,
            borderRadius,
            backgroundColor,
            flex,
            elevation,
            justifyContent : 'center',
            alignItems     : 'center',
        };

        let textStyle = {
            fontSize
        };

        return (
            <TouchableHighlight onPress={onPress} style={wrapStyle} underlayColor={'#e6e6e6'} underlayColor={underlayColor} >
                <Text style={textStyle}>{children}</Text>
            </TouchableHighlight>
        );
    }
}

TextButton.propTypes = {
    onPress   : PropTypes.func,
}

TextButton.defaultProps = {
    onPress : function(){}
}

export default TextButton;
