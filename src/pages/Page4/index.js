import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';

export default class extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00FF33',
        }}>
        <Text>Here is Page4</Text>
        <Button
          title="open drawer"
          onPress={() => {
            this.props.navigation.dispatch(DrawerActions.openDrawer());
          }}></Button>

        <Button
          title="close drawer"
          onPress={() => {
            this.props.navigation.dispatch(DrawerActions.closeDrawer());
          }}></Button>

        <Button
          title="toggle drawer"
          onPress={() => {
            this.props.navigation.dispatch(DrawerActions.toggleDrawer());
          }}></Button>

        <Button
          title="To Page5"
          onPress={() => {
            this.props.navigation.navigate('Page5');
          }}></Button>
      </View>
    );
  }
}
