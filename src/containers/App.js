import { connect } from 'react-redux';

import React, {
    Component,
    View
} from 'react-native';

class App extends Component {
    render() {
        return (
            <View>

            </View>
        );
    }
}


export default connect(state => state)(App);
