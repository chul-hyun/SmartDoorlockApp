import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    InitPage
} from '../components';

import * as pageActionCreators from '../actions/page';
import * as userActionCreators from '../actions/user';

import * as staticStore from '../static';

class App extends Component {
    render() {
        let {
            page
        } = this.props
        console.log(this.props);
        return (
            <View>
                <Pages currentPageID = {page.currentPageID}>
                    <Page id={1}>
                        <InitPage title={staticStore.title}></InitPage>
                    </Page>
                    <Page id={2}>
                        <Text>{"2"}</Text>
                    </Page>
                    <Page id={3}>
                        <Text>{"3"}</Text>
                    </Page>
                </Pages>
            </View>
        );
    }
}

function mapStateToProps(state) {
    return state
}


function mapDispatchToProps(dispatch) {
    return {
        pageActions: bindActionCreators(pageActionCreators, dispatch),
        userActions: bindActionCreators(userActionCreators, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
