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
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus';
import EventTypes from '../var/event';

const routesConfig = {
  Popular: {
    screen: PopularScreen,
    navigationOptions: {
      tabBarLabel: '热门',
      tabBarIcon: ({focused, tintColor}) => {
        return (
          <MaterialIcons name="whatshot" size={26} style={{color: tintColor}} />
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
            style={{color: tintColor}}
          />
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
          <MaterialIcons name="favorite" size={26} style={{color: tintColor}} />
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
          <MaterialIcons name="face" size={26} style={{color: tintColor}} />
        );
      },
    },
  },
};

class DynamicTabNavigator extends Component {
  constructor(props) {
    super(props);
    console.disableYellowBox = true; // 关闭警告框提示
  }

  _tabNavigator() {
    if (this.navigator) {
      return this.navigator;
    }
    const {Popular, Trending, Favourite, My} = routesConfig;

    const tabs = {Popular, Trending, Favourite, My};

    Popular.navigationOptions.tabBarLabel = '最热'; // 动态修改 tab 属性

    this.navigator = createAppContainer(
      createBottomTabNavigator(tabs, {
        tabBarComponent: props => (
          <TabBarComponent {...props} theme={this.props.theme} />
        ),
      }),
    );

    return this.navigator;
  }

  render() {
    const Tab = this._tabNavigator();
    return (
      <Tab
        onNavigationStateChange={(prevState, newState, action) => {
          EventBus.getInstance().fireEvent(EventTypes.bottomTabChange, {
            from: prevState,
            to: newState,
            action,
          });
        }}
      />
    );
  }
}

class TabBarComponent extends Component {
  render() {
    return <BottomTabBar {...this.props} activeTintColor={this.props.theme} />;
  }
}

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);
