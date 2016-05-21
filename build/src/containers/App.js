import { bindActionCreators } from '../util/extend-redux'
import { connect } from 'react-redux'

import React, {
    Component,
    StyleSheet,
    Text,
    View,
    PropTypes,
} from 'react-native';

import {
    Page,
    Pages,
    LoadingPage,
    InitPage,
    MainPage,
    RegistPage,
    SideMenu
} from '../components';

import {
    doorlockActionCreators,
    menuActionCreators,
    pageActionCreators,
    userActionCreators
} from '../actions/doorlock';

import * as staticStore from '../static/app';

class App extends Component {
    componentWillMount(){
        let { userActions } = this.props.actions;
        userActions.init();
    }
    render() {
        let { store } = this.props
        let { userActions, menuActions, pageActions } = this.props.actions;

        let currentPageID = store.getIn(['page', 'currentPageID']);
        let currentPageTitle = '';
        for( let title in staticStore.pages ){
            if(staticStore.pages[title].id === currentPageID){
                currentPageTitle = title;
            }
        }

        return (
            <View style={{flex: 1, alignItems: 'stretch'}}>
                
            </View>
        );
    }
}

App.propTypes = {

}

App.defaultProps = {

}

function mapStateToProps(state) {
    return {
        store: state.get('doorlock')
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: {
            mainActions: bindActionCreators(doorlockActionCreators, dispatch),
            menuActions: bindActionCreators(menuActionCreators, dispatch),
            pageActions: bindActionCreators(pageActionCreators, dispatch),
            userActions: bindActionCreators(userActionCreators, dispatch)
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
