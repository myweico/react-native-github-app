/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-18 22:13:39
 * @LastEditTime: 2020-03-18 22:41:27
 */
import React, {Component} from 'react';
import {TouchableOpacity, Button, ViewPropTypes} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import PropTypes, {string} from 'prop-types';

export default class BackBtn extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    style: ViewPropTypes.style,
    color: PropTypes.string,
  };

  static defaultProps = {
    style: {paddingLeft: 16},
    color: '#fff',
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{paddingLeft: 16}}>
        <Ionicons
          name={'ios-arrow-back'}
          size={26}
          style={{color: this.props.color}}></Ionicons>
      </TouchableOpacity>
    );
  }
}
