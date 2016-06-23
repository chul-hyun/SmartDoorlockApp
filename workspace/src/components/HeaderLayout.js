import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Image,
    Text
} from 'react-native';

import { TouchButton } from '../components';

export class HeaderLayout extends Component {
    render() {
        let {
            title,
            rightIcon,
            leftIcon,
            onPressRightIcon,
            onPressLeftIcon,
            children
        } = this.props;

        console.log('rightIcon', rightIcon);

        return (
            <View>
                <View>
                    <View>
                        {(leftIcon) ? <TouchButton value={leftIcon} onPress={onPressLeftIcon} /> : null}
                    </View>
                    <View>
                        <Text>{title}</Text>
                    </View>
                    <View>
                        {(rightIcon) ? <TouchButton value={rightIcon} onPress={onPressRightIcon} /> : null}
                    </View>
                </View>
                <View>
                    {children}
                </View>
            </View>
        );
    }
}

HeaderLayout.propTypes = {
    title            : PropTypes.string.isRequired,
    rightIcon        : PropTypes.string,
    leftIcon         : PropTypes.string,
    onPressRightIcon : PropTypes.func,
    onPressLeftIcon  : PropTypes.func
}

HeaderLayout.defaultProps = {
    onPressRightIcon : function(){},
    onPressLeftIcon  : function(){}
}
