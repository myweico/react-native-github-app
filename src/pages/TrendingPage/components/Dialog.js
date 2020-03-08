/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-08 16:43:09
 * @LastEditTime: 2020-03-09 00:58:11
 */

import React, {Component} from 'react';
import {Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TimeSpan from '../../../model/TimeSpan';

export const TimeSpans = [
  new TimeSpan('今天', 'since=daily'),
  new TimeSpan('本周', 'since=weekly'),
  new TimeSpan('本月', 'since="monthly'),
];

export default class TrendingDialog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  static propTypes = {
    onClose: PropTypes.func,
    onShow: PropTypes.func,
  };

  show = () => {
    this.setState({
      visible: true,
    });
  };

  dismiss = () => {
    console.log('dismiss');
    this.setState({
      visible: false,
    });
  };

  render() {
    const {onClose, onSelect} = this.props;
    return (
      <Modal
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => onClose}
        onShow={this.props.onShow}
        onDismiss={this.props.onClose}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => this.dismiss()}
          underlayColor="transparent">
          <MaterialIcons
            name={'arrow-drop-up'}
            size={36}
            style={styles.arrow}></MaterialIcons>
          <View style={styles.content}>
            {TimeSpans.map((span, i) => {
              return (
                <>
                  <TouchableOpacity
                    onPress={() => onSelect(span)}
                    underlayColor="transparent"
                    style={styles.textContainer}>
                    <Text style={styles.selectText}>{span.showText}</Text>
                  </TouchableOpacity>
                  {i === TimeSpans.length - 1 ? null : (
                    <View style={styles.devider}></View>
                  )}
                </>
              );
            })}
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    alignItems: 'center',
    paddingTop: 30
  },
  arrow: {
    marginTop: 40,
    color: 'white',
    padding: 0,
    margin: -15,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 3,
    paddingTop: 3,
    paddingBottom: 3,
  },
  textContainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  selectText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '400',
    padding: 8,
    paddingLeft: 26,
    paddingRight: 26,
  },
  devider: {
    height: 1,
    backgroundColor: 'darkgrey',
  },
});
