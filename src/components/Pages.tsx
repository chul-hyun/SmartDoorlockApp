/// <reference path="../../main.d.ts"/>

import * as React from 'react-native';
import {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

import { PageID } from '../types/index';

export interface PagesPropType {
    currentPageID: PageID
}

export interface PagesStateType {
    pageHisotry: [PageID]
}

export class Pages extends Component<PagesPropType, PagesStateType> {
    render() {
        var {children} = this.props;
        console.log(children);
        return (
            <View>
                {children}
            </View>
        );
    }
}
