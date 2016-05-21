import React, {
    Component,
    PropTypes,
    View,
    DrawerLayoutAndroid,
    TouchableHighlight,
    Text
} from 'react-native';

export class SideMenu extends Component {
    render() {
        let {
            title,
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
                titleTag = <View><Text>{section.title}</Text></View>
            }

            let menuTags = section.menus.reduce((menuTags, key)=>{
                let menu = menus[key];

                if(typeof menu === 'undefined'){
                    return menuTags;
                }

                menuTags.push(
                    <View key={menu.id}>
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
                <View key={i++}>
                    {titleTag}
                    {menuTags}
                </View>
            )

            return setctionTags;
        }, []);

        var sideTag = (
            <View>
                <View>
                    <Text>{title}</Text>
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
                <View>{children}</View>
            </DrawerLayoutAndroid>
        );
    }
}

SideMenu.propTypes = {
    title         : PropTypes.string.isRequired,
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
