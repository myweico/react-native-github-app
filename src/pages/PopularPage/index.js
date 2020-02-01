import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SafeAreaView from 'react-native-safe-area-view';

class PopularTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PopularTab</Text>
      </View>
    );
  }
}

const MatTopNav = createMaterialTopTabNavigator(
  {
    PopularTab1: {
      screen: PopularTab,
      navigationOptions: {
        title: 'Tab1',
      },
    },
    PopularTab2: {
      screen: PopularTab,
      navigationOptions: {
        title: 'Tab2',
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        marginTop: 30,
      },
    },
  },
);

export default class extends Component {
  static router = MatTopNav.router;

  render() {
    return <MatTopNav navigation={this.props.navigation} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
