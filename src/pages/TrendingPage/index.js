import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Page1 extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>趋势页</Text>
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
