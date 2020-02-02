import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import PopularScreen from '../pages/PopularPage';
import TrendingScreen from '../pages/TrendingPage';
import FavouriteScreen from '../pages/FavouritePage';
import MyScreen from '../pages/MyPage';
import WelcomeScreen from '../pages/WelcomePage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomePage from '../pages/HomePage';
import DetailScreen from '../pages/DetailPage';

// const BottomTabBarNavigator = createBottomTabNavigator(
//   {
//     Popular: {
//       screen: PopularScreen,
//       navigationOptions: {
//         tabBarLabel: '热门',
//         tabBarIcon: ({focused, tintColor}) => {
//           return (
//             <MaterialIcons
//               name="whatshot"
//               size={26}
//               style={{color: tintColor}}></MaterialIcons>
//           );
//         },
//       },
//     },
//     Trending: {
//       screen: TrendingScreen,
//       navigationOptions: {
//         tabBarLabel: '趋势',
//         tabBarIcon: ({focused, tintColor}) => {
//           return (
//             <Ionicons
//               name="md-trending-up"
//               size={26}
//               style={{color: tintColor}}></Ionicons>
//           );
//         },
//       },
//     },
//     Favourite: {
//       screen: FavouriteScreen,
//       navigationOptions: {
//         tabBarLabel: '收藏',
//         tabBarIcon: ({focused, tintColor}) => {
//           return (
//             <MaterialIcons
//               name="favorite"
//               size={26}
//               style={{color: tintColor}}></MaterialIcons>
//           );
//         },
//       },
//     },
//     My: {
//       screen: MyScreen,
//       navigationOptions: {
//         tabBarLabel: '个人',
//         tabBarIcon: ({focused, tintColor}) => {
//           return (
//             <MaterialIcons
//               name="face"
//               size={26}
//               style={{color: tintColor}}></MaterialIcons>
//           );
//         },
//       },
//     },
//   },
//   {
//     headerMode: 'none',
//   },
// );

const WelcomeStackNav = createStackNavigator(
  {
    Welcome: WelcomeScreen,
  },
  {
    headerMode: 'none',
  },
);

const MainStackNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerShown: false,
    },
  },
  DetailPage: {
    screen: DetailScreen,
  },
});

const SwitchNavigator = createSwitchNavigator({
  Wel: WelcomeStackNav,
  Main: MainStackNavigator,
});

export default SwitchNavigator;
