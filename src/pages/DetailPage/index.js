import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';

const GITHUB_URL = 'https://github.com/';

export default class Page1 extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const {getParam} = navigation;
    const projectModel = getParam('projectModel');
    this.url = projectModel.html_url || GITHUB_URL + projectModel.fullName;
    this.title = projectModel.full_name || projectModel;
  }

  goBack() {
  }

  genLeftButton() {
    return (
      <TouchableOpacity onPress={() => this.goBack()} style={{paddingLeft: 16}}>
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: '#fff'}}></Ionicons>
      </TouchableOpacity>
    );
  }

  genRightButton() {
    return (
      <View style={styles.rightButtonArea}>
        <TouchableOpacity>
          <MaterialIcons
            name="favorite"
            size={26}
            style={[styles.rightButton, {color: '#ff2f2f'}]}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity>
          <MaterialIcons
            name="favorite-border"
            size={26}
            style={[styles.rightButton, {color: '#fff'}]}></MaterialIcons>
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons
            name={'md-share'}
            size={26}
            style={[styles.rightButton, {color: '#fff'}]}></Ionicons>
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const LeftButton = this.genLeftButton();
    const RightButton = this.genRightButton();
    return (
      <View style={styles.container}>
        <NavigationBar
          title="详情页"
          leftButton={LeftButton}
          rightButton={RightButton}></NavigationBar>
        <WebView
          source={{uri: this.url}}
          style={styles.content}
          ref={ref => (this.webview = ref)}></WebView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  rightButtonArea: {
    flexDirection: 'row',
  },
  rightButton: {
    paddingRight: 10,
  },
});
