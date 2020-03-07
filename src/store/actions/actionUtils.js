import {DATA_TYPE} from '../../utils/storageUtil';
import Types from './types';

/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-07 16:10:04
 * @LastEditTime: 2020-03-07 22:04:16
 */

/**
 *
 * @param {string} type 处理的数据类型
 * @param {function} dispatch 触发action的函数
 * @param {string} storeName 存储的名字
 * @param {array} data 数据
 * @param {number} pageSize 每页的尺寸
 */
export function handleData(type, dispatch, storeName, data, pageSize) {
  let items;
  if (type === DATA_TYPE.popular) {
    items = (data && data.items) || [];
  } else {
    items = data || [];
  }
  const size = pageSize > items.length ? items.length : pageSize;

  if (type === DATA_TYPE.popular) {
    dispatch({
      type: Types.POPULAR_LOAD_SUCCESS,
      projectModes: items.slice(0, size),
      items,
      storeName,
      pageIndex: 1,
    });
  } else if (type === DATA_TYPE.trending) {
    dispatch({
      type: Types.TRENDING_LOAD_SUCCESS,
      projectModes: items.slice(0, size),
      items,
      storeName,
      pageIndex: 1,
    });
  }
}
