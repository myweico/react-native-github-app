/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-07 14:55:37
 * @LastEditTime: 2020-03-07 23:55:44
 */

import Types from '../../actions/types';

const defaultState = {};

/**
 * Trending 的状态树
 * {
 *    day: {},
 *    month: {},
 *    year: {}
 * }
 * @param {*} state
 * @param {*} actions
 */

export default function TrendingState(state = defaultState, action) {
  const {type, storeName} = action;

  switch (type) {
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          isLoading: true,
          hideLoadingMore: true,
        },
      };
    case Types.TRENDING_LOAD_SUCCESS:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          items: action.items,
          projectModes: action.projectModes,
          pageIndex: action.pageIndex,
          isLoading: false,
        },
      };
    case Types.TRENDING_LOAD_FAIL:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          isLoading: false,
        },
      };
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };
    case Types.TRENDING_LOAD_MORE_FAIL:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        },
      };
    default:
      return state;
  }
}
