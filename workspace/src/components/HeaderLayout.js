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

import {
    Logo
 } from '../components';

import {
    commonStyles,
    colors
} from '../static/styles';

class HeaderLayout extends Component {
    render() {
        let {
            title,
            rightIcon,
            leftIcon,
            onPressRightIcon,
            onPressLeftIcon,
            style,
            children,
        } = this.props;

        let headerChild = [];

        if(leftIcon){
            headerChild.push(
                <TouchableHighlight onPress={onPressLeftIcon} style={[styles.iconWrap]} underlayColor={'#e6e6e6'} >
                    <Image source={leftIcon} style={styles.icon} />
                </TouchableHighlight>
            )
        }else{
            headerChild.push(<View style={[styles.iconWrap]} />)
        }

        if(title){
            headerChild.push(
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Text style={[styles.title]}>{title}</Text>
                </View>
            )
        }else{
            headerChild.push(
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Logo style={[styles.title]} />
                </View>
            )
        }

        if(rightIcon){
            headerChild.push(
                <TouchableHighlight onPress={onPressRightIcon} style={[styles.iconWrap]} underlayColor={'#e6e6e6'} >
                    <Image source={rightIcon} style={styles.icon} />
                </TouchableHighlight>
            )
        }else{
            headerChild.push(<View style={[styles.iconWrap]} />)
        }

        return (
            <View style={[styles.layout]}>
                <View style={[styles.header]}>
                    {headerChild}
                </View>
                <View style={[styles.main, style]}>
                    {children}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        flex            : 1,
        alignItems      : 'stretch',
    },
    header: {
        height            : 50,
        flexDirection     : 'row',
        borderBottomWidth : 1,
        borderBottomColor : colors.gray
    },
    main: {

    },
    titleBox: {

    },
    title: {
        fontSize: 20
    },
    iconWrap: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
    },
    icon: {
        height: 25,
        width: 25,
    },
});

HeaderLayout.propTypes = {
    title            : PropTypes.string,
    onPressRightIcon : PropTypes.func,
    onPressLeftIcon  : PropTypes.func
}

HeaderLayout.defaultProps = {
    onPressRightIcon : function(){},
    onPressLeftIcon  : function(){}
}

export default HeaderLayout;
