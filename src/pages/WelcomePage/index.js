import React, {Component} from 'react';
import {View, Text} from 'react-native';
import NavigationUtil from '../../utils/navigationUtil';

export default class extends Component {
  componentDidMount() {
    this.timer = setTimeout(() => {
      // NavigationUtil.resetToHomePage(this.props);
      NavigationUtil.resetToHomePage();
    }, 1000);
  }

  componentWillUnmount() {
    this.timer && clearTimeout(this.timer);
    this.timer = undefined;
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome!</Text>
      </View>
    );
  }
}
