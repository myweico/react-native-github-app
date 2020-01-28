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
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import AuthScreen from '../pages/Auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createSwitchNavigator, SafeAreaView} from 'react-navigation';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ScrollView} from 'react-native-gesture-handler';

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

const DrawerNavigator = createDrawerNavigator(
  {
    Page4: {
      screen: Page4,
      navigationOptions: {
        drawerLabel: 'Bugs',
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons
            name="bug-report"
            size={24}
            style={{color: tintColor}}
          />
        ),
      },
    },
    Page5: {
      screen: Page5,
      navigationOptions: {
        drawerLabel: 'Build',
        drawerIcon: ({tintColor, focused}) => (
          <MaterialIcons name="build" size={24} style={{color: tintColor}} />
        ),
      },
    },
  },
  {
    contentComponent: props => (
      <ScrollView style={{backgroundColor: '#7dfaa3', flex: 1}}>
        <SafeAreaView forceInset={{top: 'always'}}>
          <DrawerNavigatorItems {...props}></DrawerNavigatorItems>
        </SafeAreaView>
      </ScrollView>
    ),
  },
);

// Todo: 没有设置 safearea
const MaterialTopTavNavigator = createMaterialTopTabNavigator(
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
    tabBarOptions: {
      activeTintColor: 'yellow',
      inactiveTintColor: '#fff',
      upperCaseLabel: false,
      labelStyle: {
        fontSize: 24,
      },
      tabStyle: {
        // backgroundColor: "black"
      },
    },
  },
);

const AuthNavigator = createStackNavigator({
  Login: AuthScreen,
});

const MainStackNavigator = createStackNavigator({
  HomePage: HomePage,
  BottomTab: {
    screen: BottomTabNavigator,
    navigationOptions: {
      header: null,
    },
  },
  MaterialTopTab: {
    screen: MaterialTopTavNavigator,
    navigationOptions: {},
  },
});

const SwitchNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    Main: MainStackNavigator,
    Drawer: DrawerNavigator,
  },
  {
    headerMode: 'none',
  },
);

export default SwitchNavigator;
