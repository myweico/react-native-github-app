import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import navigationUtil from '../../utils/navigationUtil';
import {BackBtn, ShareBtn} from '../../components/Button';
import BackPress from '../../components/BackPress';

const GITHUB_URL = 'https://github.com/';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    const {getParam} = navigation;
    const projectModel = getParam('projectModel');
    this.projectModel = projectModel;
    this.handleParentFavorite = getParam('handleSelect');
    this.url =
      projectModel.html_url ||
      (projectModel.full_name && GITHUB_URL + projectModel.full_name) ||
      (projectModel.fullName && GITHUB_URL + projectModel.fullName) ||
      GITHUB_URL;
    this.title = projectModel.full_name || projectModel.fullName;
    this.BackPress = new BackPress({
      backPress: () => {
        this.handleBackPress();
      },
    });
    this.state = {
      canGoBack: false,
      url: this.url,
      title: this.title,
      isFavorite: getParam('isFavorite', false),
    };
  }

  handleBackPress() {
    this.goBack();
    return true;
  }

  goBack() {
    if (this.state.canGoBack) {
      // 导航还能返回的话，返回上一个url
      this.webview.goBack();
    } else {
      navigationUtil.goBack();
    }
  }

  genLeftButton() {
    return <BackBtn onPress={() => this.goBack()} />;
  }

  handleSelect() {
    const isFavorite = this.state.isFavorite;
    this.setState({
      isFavorite: !isFavorite,
    });
    if (typeof this.handleParentFavorite === 'function') {
      // 调用
      this.handleParentFavorite(this.projectModel, !isFavorite);
    }
  }

  genRightButton() {
    return (
      <View style={styles.rightButtonArea}>
        <TouchableOpacity onPress={() => this.handleSelect()}>
          <MaterialIcons
            name={this.state.isFavorite ? 'favorite' : 'favorite-border'}
            size={26}
            style={[styles.rightButton, {color: '#fff'}]}
          />
        </TouchableOpacity>
        <ShareBtn onPress={() => {}} />
      </View>
    );
  }

  onNavigationStateChange(e) {
    console.log('event', e);
    this.setState({
      canGoBack: e.canGoBack,
      url: e.url,
    });
  }

  componentDidMount() {
    this.BackPress.componentDidMount();
  }

  componentWillUnmount() {
    this.BackPress.componentWillUnmount();
  }

  render() {
    const LeftButton = this.genLeftButton();
    const RightButton = this.genRightButton();
    return (
      <View style={styles.container}>
        <NavigationBar
          title={this.title}
          leftButton={LeftButton}
          rightButton={RightButton}
          titleLayoutStyle={
            this.title && this.title.length > 20 ? {paddingRight: 40} : {}
          }
        />
        <WebView
          source={{uri: this.url}}
          style={styles.content}
          startInLoadingState={true}
          onNavigationStateChange={e => this.onNavigationStateChange(e)}
          ref={ref => (this.webview = ref)}
        />
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
