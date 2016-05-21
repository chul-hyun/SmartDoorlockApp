import React, {
    Component,
    PropTypes,
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
            doorlockID : '',
            doorlockKey: ''
        };
    }
    render() {
        let { title, onRegist } = this.props;
        let { name, doorlockKey, doorlockID } = this.state;
        return (
            <View>
                <Text>{title}</Text>
                <View>
                    <View>
                        <Text>{'이름'}</Text>
                        <TextInput value={name} onChangeText={(name) => this.setState({name})} />
                        <Text>{'등록 ID'}</Text>
                        <TextInput value={doorlockID} onChangeText={(doorlockID) => this.setState({doorlockID})} />
                        <Text>{'등록 Key'}</Text>
                        <TextInput value={doorlockKey} onChangeText={(doorlockKey) => this.setState({doorlockKey})} />
                    </View>
                </View>
                <TouchButton value={'등록'} onPress={()=>onRegist(name, doorlockID, doorlockKey)}></TouchButton>
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
