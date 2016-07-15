import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
} from 'react-native';

import {
    HeaderLayout,
    TextButton
} from '../components';

import {
    commonStyles,
    colors
} from '../static/styles';

import icons from '../icons';

import { pages } from '../static/app';

class MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameChangeModalVisible : false,
            unregistModalVisible   : false,
            newName                : '',
        };
    }
    render() {
        let { menuActions, userActions } = this.props.actions;
        let { show }                     = menuActions;
        let { unregist, changeName }     = userActions;
        let { myPage }                   = pages;
        let { store }                    = this.props
        let {
            nameChangeModalVisible,
            unregistModalVisible,
            newName
        } = this.state;

        let name           = store.getIn(['user', 'name']);
        let registDate     = dateToString(new Date(store.getIn(['user', 'registDate']) * 1000 ));
        let latestAuthDate = dateToString(new Date(store.getIn(['user', 'latestAuthDate']) * 1000 ));

        return (
            <HeaderLayout
                title={myPage.title}
                leftIcon={icons.menu}
                onPressLeftIcon={show}
                style={[styles.layout]}
                >
                <View style={[styles.keyValBox]}>
                    <Text style={[styles.key]}>이름</Text>
                    <Text style={[styles.val]}>{name}</Text>
                </View>
                <View style={[styles.keyValBox]}>
                    <Text style={[styles.key]}>등록일</Text>
                    <Text style={[styles.val]}>{registDate}</Text>
                </View>
                <View style={[styles.keyValBox]}>
                    <Text style={[styles.key]}>최근 인증일</Text>
                    <Text style={[styles.val]}>{latestAuthDate}</Text>
                </View>
                <View style={[styles.buttonBox]}>
                    <TextButton
                        onPress={()=>this.setState({nameChangeModalVisible:true})}
                        style={[styles.button]}
                    >이름변경</TextButton>
                    <TextButton
                        onPress={()=>this.setState({unregistModalVisible:true})}
                        style={[styles.button]}
                    >등록해제</TextButton>
                </View>


                <Modal
                    transparent
                    visible={nameChangeModalVisible}
                    onRequestClose={()=>this.setState({nameChangeModalVisible:false})}
                    >
                    <View style={[commonStyles.modalContainer]}>
                        <View style={[commonStyles.modalInnerContainer]}>
                            <Text style={[commonStyles.modalTitle]}>이름을 변경하시겠습니까?</Text>
                            <TextInput
                                style={[commonStyles.center, styles.textInput]}
                                onChangeText={(newName) => this.setState({newName})}
                                placeholder={"사용하실 이름을 입력하세요"} />
                            <View style={[styles.buttonBox]}>
                                <TextButton
                                    onPress={()=>{
                                        changeName(newName);
                                        this.setState({nameChangeModalVisible:false});
                                    }}
                                    style={[styles.button]}
                                >확인</TextButton>
                                <TextButton
                                    onPress={()=>this.setState({nameChangeModalVisible:false})}
                                    style={[styles.button]}
                                >취소</TextButton>
                            </View>
                        </View>
                    </View>
                </Modal>


                <Modal
                    transparent
                    visible={unregistModalVisible}
                    onRequestClose={()=>this.setState({unregistModalVisible:false})}
                    >
                    <View style={[commonStyles.modalContainer]}>
                        <View style={[commonStyles.modalInnerContainer]}>
                            <Text style={[commonStyles.modalTitle]}>등록 해제하시겠습니까?</Text>
                            <View style={[styles.buttonBox]}>
                                <TextButton
                                    onPress={unregist}
                                    style={[styles.button]}
                                >확인</TextButton>
                                <TextButton
                                    onPress={()=>this.setState({unregistModalVisible:false})}
                                    style={[styles.button]}
                                >취소</TextButton>
                            </View>
                        </View>
                    </View>
                </Modal>
            </HeaderLayout>
        );
    }
}

const styles = StyleSheet.create({
    layout: {
        flex            : 1,
        justifyContent  : 'center',
    },
    keyValBox: {
        flexDirection : 'row',
        margin        : 10,
    },
    key: {
        width     : 100,
        fontSize  : 15,
        textAlign : 'right',
    },
    val: {
        fontSize   : 15,
        textAlign  : 'left',
        marginLeft : 20,
    },
    buttonBox: {
        flexDirection  : 'row',
        justifyContent : 'center',
        marginTop       : 20,
        marginBottom    : 20,
    },
    button: {
        width           : 100,
        height          : 30,
        elevation       : 1,
        marginLeft      : 10,
        marginRight     : 10,
        backgroundColor : colors.doneColor,
    },
    textInput: {
        width  : 200,
    }
});

MyPage.propTypes = {

}

MyPage.defaultProps = {

}

function dateToString(date){
    return `${date.getFullYear()}.${zeroFill(date.getMonth() + 1, 2)}.\
${zeroFill(date.getDate(), 2)} - ${zeroFill(date.getHours(), 2)}\
:${zeroFill(date.getMinutes(), 2)}`
}

function zeroFill(number, n){
    n -= number.toString().length;
    if ( n > 0 )
    {
        return new Array( n + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
    }
    return number + ""; // always return a string
}

import createReduxComponent from '../containers/createReduxComponent';
export default createReduxComponent(MyPage);
