import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, {
  Component,
  StyleSheet,
  Text,
  View,
  PropTypes
} from 'react-native';

import * as currentPageIDActionCreators from '../actions/currentPageID';

import { Page } from '../components/Page';
import { Pages } from '../components/Pages';

class App extends Component {
    render() {
        return (
            <View>
                <Pages currentPageID = {3}>
                    <Page id={1}>
                        <Text>{"1"}</Text>
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
  return {
    currentPageID: state.currentPageID
  };
}

function mapDispatchToProps(dispatch) {
    return {
        currentPageIDActions: bindActionCreators(currentPageIDActionCreators, dispatch),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
