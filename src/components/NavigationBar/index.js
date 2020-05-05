import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  StatusBar,
  View,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import GlobalStyles from '../../var/GlobalStyles';

const StatusBarShape = {
  barStyle: PropTypes.oneOf(['light-content', 'default']),
  hidden: PropTypes.bool,
  backgroundColor: PropTypes.string,
};

const NAV_BAR_HEIGHT_IOS = 44;
const NAV_BAR_HEIGHT_ANDROID = 50;
const STATUS_BAR_HEIGHT = 44;

export default class NavigationBar extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string,
    titleView: PropTypes.element,
    titleLayoutStyle: ViewPropTypes.style,
    hide: PropTypes.bool,
    statusBar: PropTypes.shape(StatusBarShape),
    rightButton: PropTypes.element,
    leftButton: PropTypes.element,
  };

  static defaultProps = {
    statusBar: {
      barStyle: 'light-content',
      hidden: false,
    },
    title: '标题',
  };

  getButtonElement(Button) {
    return <View style={styles.navButton}>{Button ? Button : null}</View>;
  }

  render() {
    let statusBar = !this.props.statusBar.hidden ? (
      <View style={styles.statusBar}>
        <StatusBar {...this.props.statusBar} />
      </View>
    ) : null;

    let titleView = this.props.titleView ? (
      this.props.titleView
    ) : (
      <Text ellipsizeMode="head" numberOfLines={1} style={styles.title}>
        {this.props.title}
      </Text>
    );

    let content = this.props.hidden ? null : (
      <View style={styles.navBar}>
        {this.getButtonElement(this.props.leftButton)}
        <View
          style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
          {titleView}
        </View>
        {this.getButtonElement(this.props.rightButton)}
      </View>
    );

    return (
      <View style={[styles.container, this.props.style]}>
        {statusBar}
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.themeColor,
  },
  navButton: {
    alignItems: 'center',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID,
  },
  navBarTitleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 40,
    right: 40,
    top: 0,
    bottom: 0,
  },
  title: {
    fontSize: 20,
    color: 'white',
  },
  statusBar: {
    height: Platform.OS === 'ios' ? STATUS_BAR_HEIGHT : 0,
    backgroundColor: GlobalStyles.themeColor,
  },
});
