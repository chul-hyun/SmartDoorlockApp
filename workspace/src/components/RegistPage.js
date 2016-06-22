import React, {
    Component,
    PropTypes
} from 'react';

import {
    View,
    Text,
    TextInput
} from 'react-native';

import { TouchButton } from '../components';

export class RegistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            doorlockId : '',
            doorlockKey: ''
        };
    }
    render() {
        let { title, onRegist } = this.props;
        let { name, doorlockKey, doorlockId } = this.state;
        return (
            <View>
                <Text>{title}</Text>
                <View>
                    <View>
                        <Text>{'이름'}</Text>
                        <TextInput value={name} onChangeText={(name) => this.setState({name})} />
                        <Text>{'도어락 ID'}</Text>
                        <TextInput value={doorlockId} onChangeText={(doorlockId) => this.setState({doorlockId})} />
                        <Text>{'도어락 Key'}</Text>
                        <TextInput value={doorlockKey} onChangeText={(doorlockKey) => this.setState({doorlockKey})} />
                    </View>
                </View>
                <TouchButton value={'등록'} onPress={()=>onRegist({ name, doorlockId, doorlockKey })}></TouchButton>
            </View>
        );
    }
}

RegistPage.propTypes = {
    title    : PropTypes.string.isRequired,
    onRegist : PropTypes.func
}

RegistPage.defaultProps = {

}
