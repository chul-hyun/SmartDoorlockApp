import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    DrawerLayoutAndroid,
    TouchableHighlight,
    Text,
    StyleSheet
} from 'react-native';

import {
    Logo
 } from '../components';

import { commonStyles } from '../static/styles';

export class SideMenu extends Component {
    render() {
        let {
            menus,
            sections,
            selectedMenu,
            onPressMenu,
            onDrawerClose,
            onDrawerOpen,
            show,
            children
        } = this.props;

        var i = 100;

        let setctionTags = sections.reduce((setctionTags, section)=>{
            let titleTag = null

            if(section.title){
                titleTag = <Text>{section.title}</Text>
            }

            let menuTags = section.menus.reduce((menuTags, key)=>{
                let menu = menus[key];

                if(typeof menu === 'undefined'){
                    return menuTags;
                }

                menuTags.push(
                    <View style={[styles.itemBox]} key={menu.id}>
                        <TouchableHighlight onPress={()=>onPressMenu(menu.id)}>
                            <View>
                                <Text>{menu.icon}</Text>
                                <Text>{menu.title}</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                )

                return menuTags;
            }, [])

            setctionTags.push(
                <View style={[styles.sectionBox]} key={i++}>
                    {titleTag}
                    {menuTags}
                </View>
            )

            return setctionTags;
        }, []);

        var sideTag = (
            <View style={[styles.sideBarBox]}>
                <View style={[commonStyles.center, styles.titleBox]}>
                    <Logo style={styles.title} />
                </View>
                <View>
                    {setctionTags}
                </View>
            </View>
        );

        return (
            <DrawerLayoutAndroid
                drawerWidth          = {300}
                drawerPosition       = {DrawerLayoutAndroid.positions.Left}
                renderNavigationView = {() => sideTag}
                onDrawerClose        = {onDrawerClose}
                onDrawerOpen         = {onDrawerOpen}
                ref                  = {(ref) => {
                    if(!!ref){
                        this.drawerLayoutAndroid = ref;
                        if(show){
                            ref.openDrawer()
                        }else{
                            ref.closeDrawer()
                        }
                    }
                }}>
                <View style={[commonStyles.base]} >
                    {children}
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

const styles = StyleSheet.create({
    sideBarBox:{

    },
    title: {
        fontSize: 20
    },
    titleBox: {
        padding: 10,
    },
    sectionBox: {
        borderTopWidth: 1,
        padding: 10
    },
    itemBox: {
        paddingLeft : 5,
        paddingTop  : 5
    }
});

SideMenu.propTypes = {
    menus         : PropTypes.object,
    sections      : PropTypes.array,
    selectedMenu  : PropTypes.string.isRequired,
    onPressMenu   : PropTypes.func,
    onDrawerClose : PropTypes.func,
    onDrawerOpen  : PropTypes.func,
    show          : PropTypes.bool
}

SideMenu.defaultProps = {
    show        : false,
    menus       : {},
    sections    : [],
    onPressMenu : function(){}
}
