import React, {Component} from 'react';
import {View, Linking, Clipboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {MORE_MENU} from '../../common/MORE_MENU';
import GlobalStyles from '../../var/GlobalStyles';
import ViewUtil from '../../utils/ViewUtil';
import NavigationUtil from '../../utils/navigationUtil';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import config from '../../data/about.json';
import navigationUtil from '../../utils/navigationUtil';
import Toast from 'react-native-easy-toast';

export default class AboutMePage extends Component {
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
      showTourial: false,
      showBlog: false,
      showQQ: false,
      showContact: false,
    };
  }

  onClick = data => {
    if (!data) return;
    if (data.url) {
      navigationUtil.navigate('WebviewPage', {
        title: data.title,
        url: data.url,
      });
      return;
    }
    if (data.account) {
      if (data.account.indexOf('@') > -1) {
        // 邮箱，通过Linking打开
        const url = 'mailto://' + data.account;
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              console.log('Not support the openUrl: ', data.account);
            } else {
              Linking.openURL(url);
            }
          })
          .catch(e => {
            console.error('An error occured: ', e);
          });
      } else {
        // 手机、电话、QQ， 则复制到粘贴板
        console.log('data.account', data.account);
        Clipboard.setString(data.account);
        this.toast.show(data.title + data.account + '已复制到剪贴板。');
      }
    }
  };

  _item(data, isShow, key) {
    return ViewUtil.getSettingItem(
      () => {
        this.setState({
          [key]: !this.state[key],
        });
      },
      data.name,
      GlobalStyles.themeColor,
      Ionicons,
      data.icon,
      isShow ? 'ios-arrow-up' : 'ios-arrow-down',
    );
  }

  renderItems(dic, isShowAccount) {
    if (!dic) return null;
    let views = [];
    for (let i in dic) {
      let title = isShowAccount
        ? dic[i].title + ':' + dic[i].account
        : dic[i].title;
      views.push(
        <View key={i}>
          {ViewUtil.getSettingItem(
            () => this.onClick(dic[i]),
            title,
            GlobalStyles.themeColor,
          )}
          <View style={GlobalStyles.line} />
        </View>,
      );
    }
    return views;
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
        {/* 教程 */}
        {this._item(
          this.state.data.aboutMe.Tutorial,
          this.state.showTourial,
          'showTourial',
        )}
        <View style={GlobalStyles.line} />
        {this.state.showTourial
          ? this.renderItems(this.state.data.aboutMe.Tutorial.items)
          : null}

        {/* 技术博客 */}
        {this._item(
          this.state.data.aboutMe.Blog,
          this.state.showBlog,
          'showBlog',
        )}
        <View style={GlobalStyles.line} />
        {this.state.showBlog
          ? this.renderItems(this.state.data.aboutMe.Blog.items)
          : null}

        {/* 联系方式 */}
        {this._item(
          this.state.data.aboutMe.Contact,
          this.state.showContact,
          'showContact',
        )}
        <View style={GlobalStyles.line} />
        {this.state.showContact
          ? this.renderItems(this.state.data.aboutMe.Contact.items)
          : null}

        {/* QQ */}
        {this._item(this.state.data.aboutMe.QQ, this.state.showQQ, 'showQQ')}
        <View style={GlobalStyles.line} />
        {this.state.showQQ
          ? this.renderItems(this.state.data.aboutMe.QQ.items)
          : null}
      </View>
    );
    return (
      <>
        <Toast ref={ref => (this.toast = ref)} position={'center'} />
        {this.aboutCommon.render(content, this.state.data.author)}
      </>
    );
  }
}
