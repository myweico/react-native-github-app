import React, {Component} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {WebView} from 'react-native-webview';
import navigationUtil from '../../utils/navigationUtil';
import {BackBtn, ShareBtn} from '../../components/Button';
import BackPress from '../../components/BackPress';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    const {navigation} = props;
    this.params = navigation.state.params;
    const { title, url } = this.params;
    this.BackPress = new BackPress({
      backPress: (e) => {
        this.handleBackPress(e);
      },
    });
    this.state = {
      title,
      url,
      canGoBack: false
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
    const { title, url } = this.state;
    return (
      <View style={styles.container}>
        <NavigationBar
          title={title}
          leftButton={LeftButton}
          titleLayoutStyle={
            title && title.length > 20 ? {paddingRight: 40} : {}
          }
        />
        <WebView
          source={{uri: url}}
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
