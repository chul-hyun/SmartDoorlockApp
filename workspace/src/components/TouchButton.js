import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

export class TouchButton extends Component {
    render() {
        let { value, type, onPress } = this.props;
        let childComponent;
        if(type == 'text'){
            childComponent = <Text>{value}</Text>
        }else{
            childComponent = <Image srouce={require(value)}></Image>
        }
        return (
            <TouchableHighlight onPress = {onPress}>
                {childComponent}
            </TouchableHighlight>
        );
    }
}

TouchButton.propTypes = {
    value : PropTypes.string.isRequired,
    type  : PropTypes.string,
    onPress : PropTypes.func
}

TouchButton.defaultProps = {
    type : 'text',
    onPress: function(){}
}
