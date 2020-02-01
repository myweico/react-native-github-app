import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import PopularScreen from '../PopularPage';
import TrendingScreen from '../TrendingPage';
import FavouriteScreen from '../FavouritePage';
import MyScreen from '../MyPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class extends Component {
  _navigator = () => {
    return createAppContainer(
      createBottomTabNavigator({
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
      }),
    );
  };

  render() {
    const Navigator = this._navigator();

    return <Navigator />;
  }
}
