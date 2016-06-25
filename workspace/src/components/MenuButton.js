import React, {
    Component,
    PropTypes
} from 'react';

import {
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import createReduxComponent from '../containers/createReduxComponent';

class MenuButton extends Component {
    render() {
        let { menuActions } = this.props.actions;
        let { show }     = menuActions;

        return (
            <TouchableHighlight onPress={show} style={styles.wrap} underlayColor={'#e6e6e6'} >
                <Image source={require(`../icons/menu.png`)} style={styles.img} />
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
        width: 30,
        height: 30,
    },
});

MenuButton.propTypes = {

}

MenuButton.defaultProps = {

}

export default createReduxComponent(MenuButton);
