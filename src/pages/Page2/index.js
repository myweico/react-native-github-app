import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TextInput} from 'react-native';

export default class Page2 extends Component {
  static navigationOptions = ({navigation}) => {
    const {getParam, setParams} = navigation;
    const mode = getParam('mode');
    const title = getParam('title', '默认标题');
    return {
      title,
      headerRight: (
        <Button
          title={mode === 'edit' ? '保存' : '编辑'}
          onPress={() => {
            mode === 'edit'
              ? setParams({mode: 'complete'})
              : setParams({mode: 'edit'});
          }}></Button>
      ),
    };
  };

  render() {
    const {navigation} = this.props;
    const {getParam, setParams} = navigation;
    const mode = getParam('mode');
    return (
      <View style={styles.container}>
        <Text>Page2</Text>
        {mode === 'edit' ? <Text>编辑中...</Text> : <Text>编辑完成</Text>}
        <TextInput
          style={styles.inputContainer}
          onChangeText={text => {
            setParams({
              title: text,
            });
          }}></TextInput>
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
  inputContainer: {
    borderWidth: 1,
    marginTop: 10,
    width: 100
  }
});
