import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import  from 'react-native-vector-icons/'

const GITHUB_URL = 'https://github.com/';

export default class Page1 extends Component {
  constructor(props) {
    const {navigation} = props;
    const {getParam} = navigation;
    const projectModel = getParam('projectModel');
    this.url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
    const title = projectModel.full_name || projectModel

  }

  genLeftButton() {

  }

  genRightButton() {
    return <View>
      <TouchableOpacity></TouchableOpacity>
    </View>
  }

  render() {
    const LeftButton = genLeftButton();
    const RightButton = genLeftButton();
    return (
      <View style={styles.container}>
        <NavigationBar
          title="详情页"
          leftButton={LeftButton}
          rightButton={RightButton}></NavigationBar>
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
