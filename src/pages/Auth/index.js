import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

export default class Auth extends Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Button
          title="Login"
          onPress={() => {
            this.props.navigation.navigate('Main');
          }}></Button>

        <Button
          title="To Drawer"
          onPress={() => {
            this.props.navigation.navigate('Drawer');
          }}></Button>
      </View>
    );
  }
}
