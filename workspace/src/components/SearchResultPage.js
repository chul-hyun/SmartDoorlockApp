import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';

import {
    HeaderLayout,
    HistoryList
} from '../components';

import {
    commonStyles,
    colors
} from '../static/styles';

import icons from '../icons';

import { pages } from '../static/app';

class SearchResultPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentWillMount(){

    }
    render() {
        let { menuActions, pageActions }     = this.props.actions;
        let { searchResultPage, searchPage } = pages;
        let { show }    = menuActions;
        let { setPage } = pageActions;
        let { store }   = this.props
        console.log('CHECK');
        console.log(store.get('search').toJS());
        let history     = store.getIn(['search', 'history']).toJS();

        return (
            <HeaderLayout
                title={searchResultPage.title}
                leftIcon={icons.menu}
                onPressLeftIcon={show}
                rightIcon={icons.search}
                onPressRightIcon={()=>setPage(searchPage.id)}
                style={[styles.layout]}
                >
                <HistoryList history={history} />
            </HeaderLayout>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        flex            : 1,
        justifyContent  : 'center',
    },
    list: {

    },
    header: {
        flexDirection   : 'row',
        justifyContent  : 'center',
        paddingTop      : 10,
        paddingBottom   : 10,
        backgroundColor : '#fbfdff',
    },
    headerText: {
        fontWeight : 'bold',
        textAlign  :'center'
    },
    item: {
        flexDirection     : 'row',
        justifyContent    : 'center',
        borderBottomWidth : 1,
        paddingTop        : 10,
        paddingBottom     : 10,
        borderColor       : colors.gary,
    },
    itemText:{

    },
    name: {
        flex : 2,
        textAlign :'center',
    },
    state: {
        flex : 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stateIcon: {
        width: 20,
        height: 20,
    },
    authtime: {
        flex : 2,
        textAlign :'center',
    }
});

SearchResultPage.propTypes = {

}

SearchResultPage.defaultProps = {

}

import createReduxComponent from '../containers/createReduxComponent';
export default createReduxComponent(SearchResultPage);
