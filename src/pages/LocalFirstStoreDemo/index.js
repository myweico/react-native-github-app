import React, {Component} from 'react';
import {
  TextInput,
  View,
  Text,
  Button,
  StyleSheet,
  AsyncStorage,
} from 'react-native';
import {LocalFirstStore} from '../../utils/storageUtil';

export default class FavouritePage extends Component {
  state = {
    text: '',
    showText: '',
  };

  fetchData() {
    let url = `https://api.github.com/search/repositories?q=${this.state.text}`;
    this.dataStore = LocalFirstStore.fetchData(url).then(data => {
      this.setState({
        showText: JSON.stringify(data),
      });
    });
  }

  genUrl(key) {
    return URL + key + QUERY_STR;
  }

  render() {
    const {navigation} = this.props;
    const {navigate, setParams} = navigation;
    return (
      <View style={styles.container}>
        <Text>缓存策略测试</Text>
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
              this.fetchData();
            }}
            title="请求"></Button>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
