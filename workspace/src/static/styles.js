import {
    StyleSheet
} from 'react-native';

export const colors = {
    backgroundColor : '#fff',
    doneColor       : '#d2ffc4',
    gary            : '#d1d1d1'
}

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
        backgroundColor: colors.doneColor,
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
    },
    modalContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    modalInnerContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20
    }
});
