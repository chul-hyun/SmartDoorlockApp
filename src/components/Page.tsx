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

export interface PagePropType {
    id: PageID
}

export interface PageStateType {
}

export class Page extends Component<PagePropType, PageStateType> {
    render() {
        return (
            <View>
                {this.props.children}
            </View>
        );
    }
}
