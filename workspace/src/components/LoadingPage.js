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

import {
    Logo,
 } from '../components';

export class LoadingPage extends Component {
    render() {
        return (
            <View style={[commonStyles.center, commonStyles.base, styles.main]}>
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Logo />
                    <Text style={[styles.text]}>loading...</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main:{

    },
    titleBox: {
        flex      : 1,
    },
    text: {
        fontSize : 15
    }
});

LoadingPage.propTypes = {

}

LoadingPage.defaultProps = {

}
