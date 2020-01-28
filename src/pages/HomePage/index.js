import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default class HomePage extends Component {
  render() {
    const {navigation} = this.props;
    const {navigate} = navigation;
    return (
      <View style={styles.container}>
        <Button
          title="To BottomTab"
          onPress={() => {
            navigate('BottomTab');
          }}
          style={{marginTop: 10}}></Button>

        <Button
          title="To MaterialTopBar"
          onPress={() => {
            navigate('MaterialTopTab');
          }}
          style={{marginTop: 10}}></Button>

        <Button
          title="To Login"
          onPress={() => {
            navigate('Auth');
          }}
          style={{marginTop: 10}}></Button>
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
