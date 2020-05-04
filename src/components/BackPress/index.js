/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-18 23:13:38
 * @LastEditTime: 2020-05-04 10:10:08
 */

import {BackHandler} from 'react-native';

export default class BackPress {
  constructor(props) {
    this.props = props;
    this.onHardwareBackPress = this.onHardwareBackPress.bind(this);
  }

  componentDidMount() {
    if (this.props.backPress)
      BackHandler.addEventListener(
        'hardwareBackPress',
        this.onHardwareBackPress,
      );
  }

  componentWillUnmount() {
    if (this.props.backPress)
      BackHandler.removeEventListener(
        'hardwareBackPress',
        this.onHardwareBackPress,
      );
  }

  onHardwareBackPress(e) {
    return this.props.backPress(e);
  }
}
