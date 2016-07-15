import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    StyleSheet
} from 'react-native';

import {
    MenuButton,
    UnlockButton,
    Logo
 } from '../components';

import { commonStyles } from '../static/styles';

class MainPage extends Component {
    render() {
        return (
            <View style={[commonStyles.center, commonStyles.base]}>
                <View style={[styles.headerBox]}>
                    <MenuButton />
                </View>
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Logo />
                </View>
                <View style={[commonStyles.center, styles.buttonBox]}>
                    <UnlockButton />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBox: {
        height: 50,
        width: 50,
        padding: 10,
        alignItems     : 'stretch',
    },
    titleBox: {
        flex : 3,
    },
    buttonBox: {
        flex : 4,
    }
});

MainPage.propTypes = {

}

MainPage.defaultProps = {

}

export default MainPage;
