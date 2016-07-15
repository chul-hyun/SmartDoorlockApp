import React, {
    Component,
    PropTypes
} from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import {
    StartButton,
    Logo
 } from '../components';

import { commonStyles } from '../static/styles';

import createReduxComponent from '../containers/createReduxComponent';

export class InitPage extends Component {
    render() {
        console.log('render');
        return (
            <View style={[commonStyles.center, commonStyles.base]}>
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Logo />
                </View>
                <View style={[commonStyles.center, styles.main]}>
                    <StartButton />
                </View>
            </View>
        );
    }
}

export const styles = StyleSheet.create({
    titleBox: {
        flex : 1,
    },
    main: {
        flex : 1,
    },
    button: {
        fontSize : 20,
    }
});


InitPage.propTypes = {
    
}

InitPage.defaultProps = {

}
