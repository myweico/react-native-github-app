import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Page1 extends Component {
  render() {
    const {navigation} = this.props;
    const {setParams} = navigation;
    console.log('detail props', this.props);
    return (
      <View style={styles.container}>
        <Text>详情页</Text>
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
