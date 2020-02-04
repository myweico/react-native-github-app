import React, {Component} from 'react';
import {Provider} from 'react-redux';
import rootNavigator from './navigator';
import {createAppContainer} from 'react-navigation';
import navigationUtil from './utils/navigationUtil';
import store from './store';

const AppContainer = createAppContainer(rootNavigator);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer
          ref={navigatorRef =>
            navigationUtil.setTopLevelNavigator(navigatorRef)
          }></AppContainer>
      </Provider>
    );
  }
}
