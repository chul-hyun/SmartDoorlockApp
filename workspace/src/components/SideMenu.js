import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    DrawerLayoutAndroid,
    TouchableHighlight,
    Text,
    Image,
    StyleSheet
} from 'react-native';

import {
    Logo
 } from '../components';

import {
    commonStyles,
    colors
 } from '../static/styles';

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
                titleTag = <Text style={[styles.sectionTitle]}>{section.title}</Text>
            }

            let menuTags = section.menus.reduce((menuTags, key)=>{
                let menu = menus[key];

                if(typeof menu === 'undefined'){
                    return menuTags;
                }

                menuTags.push(
                    <TouchableHighlight onPress={()=>onPressMenu(menu.id)} style={[styles.itemBox]} key={menu.id}>
                        <View style={[styles.item]}>
                            <Image source={menu.icon} style={styles.icon} />
                            <Text>{menu.title}</Text>
                        </View>
                    </TouchableHighlight>
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
        paddingTop  : 25,
    },
    titleBox: {
        padding : 25,
    },
    title: {
        fontSize   : 20,
        fontWeight : 'bold',
    },
    sectionBox: {
        borderTopWidth : 1,
        borderTopColor : colors.gary,
    },
    sectionTitle: {
        marginTop    : 15,
        marginBottom : 15,
        marginLeft   : 15,
        fontWeight   : 'bold',
    },
    itemBox: {
        paddingLeft   : 20,
        paddingTop    : 10,
        paddingBottom : 10,
    },
    item: {
        flexDirection: 'row',
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10,
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
