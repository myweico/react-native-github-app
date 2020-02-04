import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';

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

  get = async key => {
    try {
      const value = await AsyncStorage.getItem(key);
      this.setState({showText: value});
      console.log('value got', value);
    } catch (err) {
      console.log('get error: ', err);
    }
  };

  render() {
    const {navigation} = this.props;
    const {navigate, setParams} = navigation;
    return (
      <View style={styles.container}>
        <Text>收藏页</Text>
        <View style={{width: '100%'}}>
          <TextInput
            onChangeText={text => {
              this.setState({
                text,
              });
            }}
            style={{
              borderWidth: 1,
              borderColor: '#000',
            }}></TextInput>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button
            onPress={() => {
              this.save('key', this.state.text);
            }}
            title="保存"></Button>
          <Button
            onPress={() => {
              this.remove('key');
            }}
            title="删除"></Button>
          <Button
            onPress={() => {
              this.get('key');
            }}
            title="获取"></Button>
        </View>
        <View>
          <Text>{this.state.showText}</Text>
        </View>
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
