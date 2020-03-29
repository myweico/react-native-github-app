import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, AsyncStorage} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import navigationUtil from '../../utils/navigationUtil';
import moduleName from 'react'

export default class FavouritePage extends Component {
  state = {
    text: '',
    showText: '',
  };

  save(key, text) {
    AsyncStorage.setItem(key, text, err => {
      console.log('in save callback');
      err && console.log(err.toString());
    });
  }

  remove(key) {
    AsyncStorage.removeItem(key)
      .then(() => {
        console.log('removed resolve');
      })
      .catch(err => {
        console.log('remove catch', err);
      });
  }

  async get(key) {
    try {
      const value = AsyncStorage.getItem(key);
      this.setState({showText: value});
      console.log('value got', value);
    } catch (err) {
      console.log('get error: ', err);
    }
  }

  render() {
    const {navigation} = this.props;
    const {navigate, setParams} = navigation;
    return (
      <View style={styles.container}>
        <Text>收藏页</Text>
        <Button
          onPress={() => {
            navigationUtil.navigate('AsyncStorageDemo');
          }}
          title="AsyncStorageDemo"
        />
        <Button
          onPress={() => {
            navigationUtil.navigate('DataStore');
          }}
          title="DataStoreDemo"
        />
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
