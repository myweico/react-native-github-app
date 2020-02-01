import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class Page1 extends Component {
  render() {
    const {navigation} = this.props;
    const {setParams} = navigation;
    return (
      <View style={styles.container}>
        <Text>趋势页</Text>
        <Button
          title="改变主题"
          onPress={() => {
            setParams({
              theme: {
                tintColor: 'blue',
                updateTime: new Date().getTime(),
              },
            });
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
