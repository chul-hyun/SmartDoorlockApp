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
            opened,
            menus,
            sections,
            selectedMenu,
            onPressMenu
        } = this.props;

        let setctionTags = sections.reduce(function(setctionTags, section){
            let titleTag = null

            if(section.title){
                titleTag = <View><Text>{section.title}</Text></View>
            }

            let menuTags = section.menus.reduce(function((menuTags, id){
                //let menu = menus[id];
                menuTags.push(
                    <View>
                        <TouchableHighlight onPress={()=>onPressMenu(menu.id)}>
                            <Text>{menu.name}</Text>
                        </TouchableHighlight>
                    </View>
                )
            }, [])

            setctionTags.push(
                <View>
                    {titleTag}
                    {menuTags}
                </View>
            )
        }, [])

        return (
            <DrawerLayoutAndroid>
                <View>
                    <Text>{title}</Text>
                </View>
                <View>
                    {setctionTags}
                </View>
            </DrawerLayoutAndroid>
        );
    }
}

SideMenu.propTypes = {
    title        : PropTypes.string.isRequired,
    opened       : PropTypes.bool,
    menus        : PropTypes.array
    sections     : PropTypes.array
    selectedMenu : PropTypes.number.isRequired,
    onPressMenu  : PropTypes.func
}

SideMenu.defaultProps = {
    opened      : false,
    menus       : [],
    sections    : [],
    onPressMenu : function(){}
}
