import React, {Component} from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
import HomePage from '../pages/HomePage';
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page3 from '../pages/Page3';
import Ionicons from 'react-native-vector-icons/Ionicons';

const BottomTabNavigator = createBottomTabNavigator(
  {
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Ionicons name="ios-home" size={26} style={{color: tintColor}} />
          );
        },
      },
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: 'People',
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Ionicons name="ios-people" size={26} style={{color: tintColor}} />
          );
        },
      },
    },
    Page3: {
      screen: Page3,
      navigationOptions: {
        tabBarLabel: 'Sport',
        tabBarIcon: ({focused, horizontal, tintColor}) => {
          return (
            <Ionicons name="ios-bicycle" size={26} style={{color: tintColor}} />
          );
        },
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
    navigationOptions: {
      tabBarLabel: 'Home!',
    },
  },
);

// Todo: 没有设置 safearea
const MaterialTopTavNavigator = createMaterialTopTabNavigator({
  Page1: {
    screen: Page1,
  },
  Page2: {
    screen: Page2,
  },
  Page3: {
    screen: Page3,
  },
});

const StackNavigator = createStackNavigator({
  HomePage: HomePage,
  BottomTab: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  MaterialTopTab: {
    screen: MaterialTopTavNavigator,
    navigationOptions: {
      header: null,
    },
  },
});

export default StackNavigator;
