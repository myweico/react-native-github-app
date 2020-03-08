import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Page3 extends Component {
  getLeftButton(callback) {
    return (
      <TouchableOpacity onPress={callback} style={{paddingLeft: 16}}>
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: '#fff'}}></Ionicons>
      </TouchableOpacity>
    );
  }

  getRightButton(callback) {
    return (
      <TouchableOpacity onPress={callback} style={{paddingRight: 16}}>
        <Feather name={'search'} size={24} style={{color: '#fff'}}></Feather>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <>
        <NavigationBar
          title={'个人信息'}
          leftButton={this.getLeftButton()}
          rightButton={this.getRightButton()}></NavigationBar>
        <View style={styles.container}>
          <Text>我的</Text>
        </View>
      </>
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
