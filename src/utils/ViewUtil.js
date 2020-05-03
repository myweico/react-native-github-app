/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-05-03 17:59:35
 * @LastEditTime: 2020-05-03 20:44:20
 */

import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
  /**
   * 获取设置菜单的 item
   * @param {function} callback 点击的回调函数
   * @param {string} text 文字
   * @param {string} color 图标的颜色
   * @param {Component} Icons react-native-vector-icons组件
   * @param {icon} icon 左侧图标
   * @param {Component} expandableIco 右侧图标
   */
  static getSettingItem(callback, text, color, Icons, icon, expandableIco) {
    return (
      <TouchableOpacity
        onPress={() => {
          if (typeof callback === 'function') {
            callback();
          }
        }}
        style={styles.settingItemContainer}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {Icons && icon ? (
            <Icons
              name={icon}
              size={16}
              style={{color: color, marginRight: 10}}
            />
          ) : (
            <View
              style={{opacity: 1, width: 16, height: 16, marginRight: 10}}
            />
          )}
          <Text>{text}</Text>
        </View>
        <Ionicons
          name={expandableIco || 'ios-arrow-forward'}
          size={16}
          style={{
            marginRight: 10,
            alignSelf: 'center',
            color: color || 'black',
          }}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 显示菜单 item
   * @param {*} callback 回调函数
   * @param {*} menu
   * @param {*} color
   * @param {*} expandableIco
   */
  static getMunuItem(callback, menu, color, expandableIco) {
    return ViewUtil.getSettingItem(
      callback,
      menu.name,
      color,
      menu.Icons,
      menu.icon,
      expandableIco,
    );
  }
}

const styles = StyleSheet.create({
  settingItemContainer: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
