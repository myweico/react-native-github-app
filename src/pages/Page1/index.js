import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Page1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Page1</Text>

        <Button
          title="Back"
          onPress={() => {
            this.props.navigation.goBack();
          }}></Button>

        <Button
          title="add Page1"
          onPress={() => {
            this.props.navigation.push('Page1');
          }}></Button>

        <Button
          title="change Title"
          onPress={() => {
            this.props.navigation.setParams({
              title: 'page1Title',
            });
          }}></Button>

        <Button
          title="navigate Page1"
          onPress={() => {
            this.props.navigation.navigate('Page1');
          }}></Button>

        <Button
          title="Modal"
          onPress={() => {
            this.props.navigation.navigate('MyModal');
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
