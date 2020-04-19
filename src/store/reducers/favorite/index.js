/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-04-18 18:35:26
 * @LastEditTime: 2020-04-19 08:25:04
 */
import types from '../../actions/types';

const defaultState = {};

export default function FavoriteReducer(state = defaultState, action) {
  const {storeName, projectModel, error, type, isLoading} = action;
  switch (type) {
    case types.FAVORITE_LOAD_DATA:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          isLoading,
        },
      };
    case types.FAVORITE_LOAD_SUCCESS:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          projectModel,
          isLoading,
        },
      };

    case types.FAVORITE_LOAD_FAIL:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          isLoading,
        },
      };
    default:
      return state;
  }
}
