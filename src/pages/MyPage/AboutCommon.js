/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-05-04 11:50:26
 * @LastEditTime: 2020-05-05 11:55:52
 */
import React from 'react';
import BackPress from '../../components/BackPress';
import navigationUtil from '../../utils/navigationUtil';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GlobalStyles from '../../var/GlobalStyles';
import {
  Platform,
  Dimensions,
  StyleSheet,
  DeviceInfo,
  View,
  Image,
  Text,
} from 'react-native';
import BackBtn from '../../components/Button/BackBtn';
import ShareBtn from '../../components/Button/ShareBtn';

export const FLAG_ABOUT = {flag_about: 'about', flag_about_me: 'about_me'};
export default class AboutCommon {
  constructor(props, updateState) {
    this.props = props;
    this.updateState = updateState;
    this.backPress = new BackPress({
      backPresss: () => {
        this.onBackPress();
      },
    });
  }

  onBackPress() {
    navigationUtil.goBack();
    return true;
  }

  componentDidMount() {
    this.backPress.componentDidMount();
    fetch('http://www.devio.org/io/GitHubPopular/json/github_app_config.json')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error('Network Error');
        }
      })
      .then(config => {
        if (config) {
          this.updateState({
            data: config,
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentWillUnmount() {
    this.backPress.componentWillUnmount();
  }

  getParallaxRenderConfig(params) {
    let config = {};
    const avatar =
      typeof params.avatar === 'string' ? {uri: params.avatar} : params.avatar;
    config.renderBackground = () => (
      <View key="background">
        <Image
          source={{
            uri: params.backgroundImg,
            width: window.width,
            height: PARALLAX_HEADER_HEIGHT,
          }}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            width: window.width,
            backgroundColor: 'rgba(0, 0, 0, .4)',
            height: PARALLAX_HEADER_HEIGHT,
          }}
        />
      </View>
    );
    config.renderForeground = () => (
      <View key="parallax-header" style={styles.parallaxHeader}>
        <Image style={styles.avatar} source={avatar} />
        <Text style={styles.sectionSpeakerText}>{params.name}</Text>
        <Text style={styles.sectionTitleText}>{params.description}</Text>
      </View>
    );
    config.renderStickyHeader = () => (
      <View key="sticky-header" style={styles.stickySection}>
        <Text style={styles.stickySectionText}>{params.name}</Text>
      </View>
    );
    config.renderFixedHeader = () => (
      <View key="fixed-header" style={styles.fixedSection}>
        <BackBtn
          onPress={() => {
            navigationUtil.goBack();
          }}
        />
        <ShareBtn onPress={() => {}} />
      </View>
    );
    return config;
  }

  render(contentView, params) {
    const renderConfig = this.getParallaxRenderConfig(params);

    return (
      <ParallaxScrollView
        backgroundColor={GlobalStyles.themeColor}
        contentBackgroundColor={GlobalStyles.backgroundColor}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        stickyHeaderHeight={STICKY_HEADER_HEIGHT}
        backgroundScrollSpeed={10}
        {...renderConfig}>
        {contentView}
      </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 90;
const PARALLAX_HEADER_HEIGHT = 270;
const TOP =
  Platform.OS === 'ios' ? 20 + (DeviceInfo.isIPhoneX_deprecated ? 20 : 0) : 0;
const STICKY_HEADER_HEIGHT =
  Platform.OS === 'ios'
    ? GlobalStyles.navBarHeightIos + (DeviceInfo.isIPhoneX_deprecated ? 44 : 20)
    : GlobalStyles.navBarHeightAndroid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    alignItems: 'center',
    paddingTop: TOP,
  },
  stickySectionText: {
    color: 'white',
    fontSize: 20,
    margin: 10,
  },
  fixedSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: TOP,
  },
  fixedSectionText: {
    color: '#999',
    fontSize: 20,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
    marginBottom: 10,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 16,
    marginRight: 10,
    marginLeft: 10,
  },
});
