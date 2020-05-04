import {createStackNavigator} from 'react-navigation-stack';
import {createSwitchNavigator} from 'react-navigation';
import WelcomeScreen from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';
import DetailScreen from '../pages/DetailPage';
import AsyncStorageDemo from '../pages/AsyncStorageDemo';
import DataStoreScreen from '../pages/LocalFirstStoreDemo';
import WebviewPage from '../pages/WebviewPage';
import AboutPage from '../pages/MyPage/AboutPage';

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
    navigationOptions: {
      header: null,
    },
  },
  WebviewPage: {
    screen: WebviewPage,
    navigationOptions: {
      header: null,
    },
  },
  AsyncStorageDemo: {
    screen: AsyncStorageDemo,
  },
  DataStore: {
    screen: DataStoreScreen,
  },
  AboutPage: {
    screen: AboutPage,
    navigationOptions: {
      header: null,
    },
  },
});

const SwitchNavigator = createSwitchNavigator({
  Wel: WelcomeStackNav,
  Main: MainStackNavigator,
});

export default SwitchNavigator;
