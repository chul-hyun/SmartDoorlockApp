import React, {
    Component,
    PropTypes
} from 'react';

import {
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import {
    TextButton
 } from '../components';

import { commonStyles } from '../static/styles';
import * as staticStore from '../static/app';

class StartButton extends Component {
    render() {
        let { pageActions } = this.props.actions;
        let { setPage }     = pageActions;
        let { pages } = staticStore;

        return (
            <TextButton
                onPress={()=>setPage(pages.registPage.id)}
                style={[commonStyles.cycle, commonStyles.flow, styles.warp, styles.text]} 
                underlayColor={'#e6e6e6'}
            >
                시작하기
            </TextButton>
        );
    }
}

const styles = StyleSheet.create({
    warp:{
        justifyContent : 'center',
        alignItems     : 'center',
    },
    text: {
        fontSize : 20,
    }
});

StartButton.propTypes = {

}

StartButton.defaultProps = {

}

import createReduxComponent from '../containers/createReduxComponent';
export default createReduxComponent(StartButton);
