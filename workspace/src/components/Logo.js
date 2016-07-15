import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { commonStyles } from '../static/styles';

import { title } from '../static/app';

let Logo = ({style})=>(
    <Text style={[styles.title, style]}>{title}</Text>
);

const styles = StyleSheet.create({
    title: {
        fontSize: 30
    }
});

Logo.propTypes = {

}

Logo.defaultProps = {

}

export default Logo;
