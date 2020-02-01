import React, {Component} from 'react';
import Navigator from './src/navigator';
import {createAppContainer} from 'react-navigation';
import NavigationUtil from './src/utils/navigationUtil';

const AppContainer = createAppContainer(Navigator);

export default class App extends Component {
  render() {
    return (
      <AppContainer
        ref={navigatorRef => {
          NavigationUtil.setTopLevelNavigator(navigatorRef);
        }}
      />
    );
  }
}
