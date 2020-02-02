import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import PopularScreen from '../pages/PopularPage';
import TrendingScreen from '../pages/TrendingPage';
import FavouriteScreen from '../pages/FavouritePage';
import MyScreen from '../pages/MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const routesConfig = {
  Popular: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarLabel: '热门',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <MaterialIcons
            name="whatshot"
            size={26}
            style={{color: tintColor}}></MaterialIcons>
        );
      },
    },
  },
  Trending: {
    screen: TrendingScreen,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <Ionicons
            name="md-trending-up"
            size={26}
            style={{color: tintColor}}></Ionicons>
        );
      },
    },
  },
  Favourite: {
    screen: FavouriteScreen,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <MaterialIcons
            name="favorite"
            size={26}
            style={{color: tintColor}}></MaterialIcons>
        );
      },
    },
  },
  My: {
    screen: MyScreen,
    navigationOptions: {
      tabBarLabel: '个人',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <MaterialIcons
            name="face"
            size={26}
            style={{color: tintColor}}></MaterialIcons>
        );
      },
    },
  },
};

export default class extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // 关闭警告框提示
  }

  _tabNavigator() {
    const {Popular, Trending, Favourite, My} = routesConfig;

    const tabs = {Popular, Trending, Favourite, My};

    Popular.navigationOptions.tabBarLabel = '最热'; // 动态修改 tab 属性

    const Navigator = createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: TabBarComponent,
      }),
    );

    return Navigator;
  }

  render() {
    const Tab = this._tabNavigator();
    return <Tab />;
  }
}

class TabBarComponent extends Component {
  constructor(props) {
    super(props);
    this.theme = {
      tintColor: props.tintColor,
      updateTime: new Date().getTime(),
    };
  }
  render() {
    const {routes, index} = this.props.navigation.state;
    if (routes[index].params) {
      const {theme} = routes[index].params;
      if (theme && theme.updateTime > this.theme.updateTime) {
        this.theme = theme;
      }
    }
    return (
      <BottomTabBar
        {...this.props}
        activeTintColor={
          this.theme.tintColor || this.props.activeTintColor
        }></BottomTabBar>
    );
  }
}
