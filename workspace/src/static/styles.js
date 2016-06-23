import {
    StyleSheet
} from 'react-native';

export const backgroundColor = '#fff';
export const doneColor = '#d2ffc4';

export const commonStyles = StyleSheet.create({
    base: {
        flex          : 1,
        alignItems    : 'stretch',
    },
    bigText: {
        fontSize  : 30,
    },
    cycle: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: doneColor,
    },
    center: {
        flex: 1,
        alignItems     : 'center',
        justifyContent : 'center',
    },
    flow: {
        elevation : 1,
    },
    icon: {
        width: 30,
        height: 30,
    }
});
