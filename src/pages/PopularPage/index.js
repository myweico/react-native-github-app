import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import SafeAreaView from 'react-native-safe-area-view';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from '../../utils/navigationUtil';

class PopularTab extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PopularTab</Text>
        <Text
          onPress={() => {
            console.log(this.props);
            // this.props.navigation.navigate('DetailPage');
            NavigationUtil.navigate('DetailPage');
          }}>
          跳转到详情页
        </Text>
      </View>
    );
  }
}

// const MatTopNav = createMaterialTopTabNavigator(
//   {
//     PopularTab1: {
//       screen: PopularTab,
//       navigationOptions: {
//         title: 'Tab1',
//       },
//     },
//     PopularTab2: {
//       screen: PopularTab,
//       navigationOptions: {
//         title: 'Tab2',
//       },
//     },
//   },
//   {
//     tabBarOptions: {
//       tabStyle: {
//         marginTop: 30,
//       },
//     },
//   },
// );

export default class PopularPage extends Component {
  static router;

  constructor(props) {
    super(props);
    this.tabs = [
      'Android',
      'IOS',
      'Java',
      'PHP',
      'Javascript',
      'Python',
      'C',
      'C++',
      'C#',
    ];
  }

  genTabBar() {
    const routesConfig = {};
    this.tabs.forEach((part, index) => {
      routesConfig[`tab${index}`] = {
        screen: props => <PopularTab {...props} />,
        navigationOptions: {
          tabBarLabel: part,
        },
      };
    });
    return createAppContainer(
      createMaterialTopTabNavigator(routesConfig, {
        tabBarOptions: {
          scrollEnabled: true,
          tabStyle: {
            minWidth: 50,
            marginTop: 30,
          },
          upperCaseLabel: false,
          labelStyle: {
            fontSize: 14,
            marginVertical: 6,
          },
          indicatorStyle: {
            height: 2,
            backgroundColor: '#fff',
          },
        },
      }),
    );
  }

  render() {
    const MatTopNav = this.genTabBar();

    return <MatTopNav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
