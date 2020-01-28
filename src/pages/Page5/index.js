import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';
import {DrawerActions} from 'react-navigation-drawer';

export default class extends Component {
  render() {
    const {navigation} = this.props;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#00CC99',
        }}>
        <Text>Here is Page5</Text>
        <Button
          title="open drawer"
          onPress={() => {
            navigation.openDrawer();
          }}></Button>

        <Button
          title="close drawer"
          onPress={() => {
            navigation.closeDrawer();
          }}></Button>

        <Button
          title="toggle drawer"
          onPress={() => {
            navigation.toggleDrawer();
          }}></Button>

        <Button
          title="to Page4"
          onPress={() => {
            navigation.navigate('Page4');
          }}></Button>
      </View>
    );
  }
}
