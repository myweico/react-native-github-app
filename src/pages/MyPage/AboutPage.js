import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MORE_MENU} from '../../common/MORE_MENU';
import GlobalStyles from '../../var/GlobalStyles';
import ViewUtil from '../../utils/ViewUtil';
import NavigationUtil from '../../utils/navigationUtil';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import config from '../../data/about.json';

const THEME_COLOR = '#678';
export default class AboutPage extends Component {
  constructor(props) {
    super(props);
    this.params = this.props.navigation.state.params;
    this.aboutCommon = new AboutCommon(
      {
        ...this.params,
        navigation: this.props.navigation,
        flagAbout: FLAG_ABOUT.flag_about_me,
      },
      data => this.setState({...data}),
    );
    this.state = {
      data: config,
    };
  }

  onClick = menu => {
    let RouteName,
      params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebviewPage';
        params.title = '教程';
        params.url = 'https://coding.m.imooc.com/classindex.html?cid=304';
        break;

      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.navigate(RouteName, params);
    }
  };

  getItem(menu) {
    return ViewUtil.getMunuItem(
      () => {
        this.onClick(menu);
      },
      menu,
      THEME_COLOR,
    );
  }

  componentDidMount() {
    this.aboutCommon.componentDidMount();
  }

  componentWillUnmount() {
    this.aboutCommon.componentWillUnmount();
  }

  render() {
    const content = (
      <View>
        {this.getItem(MORE_MENU.Tutorial)}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.About_Author)}
        <View style={GlobalStyles.line} />
        {this.getItem(MORE_MENU.Feedback)}
        <View style={GlobalStyles.line} />
      </View>
    );
    return this.aboutCommon.render(content, this.state.data.app);
  }
}