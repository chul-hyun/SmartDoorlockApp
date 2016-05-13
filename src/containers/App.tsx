/// <reference path="../../main.d.ts"/>

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react-native';
import {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { PropTypes } from 'react';
import { Store } from '../types/index';

import * as currentPageIDActionCreators from '../actions/currentPageID';
import * as currentPageIDActionCreatorsType from '../actions/currentPageID.d';

import { Page } from '../components/Page';
import { Pages } from '../components/Pages';

interface TDispatchProps {
    currentPageIDActions: currentPageIDActionCreatorsType
}

export interface AppPropType {

}

export interface AppStateType {

}

class App extends Component<AppPropType & Store, AppStateType> {
    render() {
        var { currentPageID } = this.props;
        return (
            <View>
                <Pages currentPageID ={1}>
                    <Page id={1}>{"1"}</Page>
                    <Page id={2}>{"2"}</Page>
                    <Page id={3}>{"3"}</Page>
                </Pages>
            </View>
        );
    }
}

function mapStateToProps(state:Store) {
  return {
    currentPageID: state.currentPageID
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch) {
    return {
        currentPageIDActions: bindActionCreators(currentPageIDActionCreators, dispatch),
    }
}


export default connect<TStateProps, TDispatchProps, AppPropType>(mapStateToProps, mapDispatchToProps)(App);
