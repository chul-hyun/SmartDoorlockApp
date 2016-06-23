import React, {
    Component,
    PropTypes
} from 'react';

import {
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {
    commonStyles,
} from '../static/styles';

class UnlockButton extends Component {
    render() {
        let { doorlockActions } = this.props.actions;
        let { unlock }     = doorlockActions;

        return (
            <TouchableHighlight onPress={unlock} style={[commonStyles.cycle, styles.wrap]} underlayColor={'#e6e6e6'} >
                <Image source={require(`../icons/unlock.png`)} style={styles.img} />
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    wrap: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    img: {
        height: 50,
        width: 50,
    },
});

UnlockButton.propTypes = {

}

UnlockButton.defaultProps = {

}

import createReduxComponent from '../containers/createReduxComponent';
export default createReduxComponent(UnlockButton);
