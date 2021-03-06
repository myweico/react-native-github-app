import {NavigationActions} from 'react-navigation';

export default class navigationUtil {
  static _navigator;

  /**
   * 保存顶级的 navigator，用于 dispatch action
   */
  static setTopLevelNavigator = navigatorRef => {
    this._navigator = navigatorRef;
  };

  /**
   * 回到主要的 navigator
   */
  static resetToHomePage = (params = {}) => {
    this.navigate('Main', params);
  };

  /**
   * 导航
   */
  static navigate = (routeName, params) => {
    this._navigator.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
      }),
    );
  };

  // static resetToHomePage = (params = {}) => {
  //   const {navigation} = params;
  //   navigation.navigate('Main');
  // };
  static goBack = () => {
    this._navigator.dispatch(NavigationActions.back());
  };
}
