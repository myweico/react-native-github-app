import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class HomePage extends Component {
  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    return (
      <View style={styles.container}>
        <Text>收藏页</Text>
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
