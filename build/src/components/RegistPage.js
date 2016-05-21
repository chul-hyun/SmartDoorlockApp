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
            doorlockKey: ''
        };
    }
    render() {
        let { title, onRegist } = this.props;
        let { name, doorlockKey } = this.state;
        return (
            <View>
                <Text>{title}</Text>
                <View>
                    <View>
                        <Text>{'이름'}</Text>
                        <TextInput value={name} onChangeText={(name) => this.setState({name})} />
                        <Text>{'등록키'}</Text>
                        <TextInput value={doorlockKey} onChangeText={(doorlockKey) => this.setState({doorlockKey})} />
                    </View>
                </View>
                <TouchButton value={'등록'} onPress={()=>onRegist(name, doorlockKey)}></TouchButton>
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
