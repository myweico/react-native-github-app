/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-04-18 18:26:31
 * @LastEditTime: 2020-04-19 08:24:10
 */

import types from '../types';
import FavoriteDao from '../../../dao/FavoriteDao';
import ProjectModel from '../../../model/projectModel';
import {} from '../../../utils/favouriteUtil';

export function onLoadFavoriteData(flag, favoriteDao) {
  return dispatch => {
    dispatch({type: types.FAVORITE_LOAD_DATA, storeName: flag});
    favoriteDao
      .getAllItems()
      .then(items => {
        let resultData = [];
        for (let i = 0, len = items.length; i < len; i++) {
          resultData.push(new ProjectModel(items[i], true));
        }
        dispatch({
          type: types.FAVORITE_LOAD_SUCCESS,
          projectModel: resultData,
          storeName: flag,
          isLoading: false
        });
      })
      .catch(e => {
        dispatch({
          type: types.FAVORITE_LOAD_FAIL,
          error: e,
          storeName: flag,
          isLoading: false
        });
      });
  };
}
