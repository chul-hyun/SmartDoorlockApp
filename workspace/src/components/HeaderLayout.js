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

        return (
            <View>
                <View>
                    <View>
                        <TouchButton value={leftIcon} onPress={onPressLeftIcon} />
                    </View>
                    <View>
                        <Text>{title}</Text>
                    </View>
                    <View>
                        <TouchButton value={rightIcon} onPress={onPressRightIcon} />
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
