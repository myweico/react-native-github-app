import {DATA_TYPE} from '../../utils/storageUtil';
import Types from './types';
import ProjectModel from '../../model/projectModel';
import favouriteUtil from '../../utils/favouriteUtil';

/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-07 16:10:04
 * @LastEditTime: 2020-03-29 23:55:00
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
  const showItems = items.slice(0, size);
  _projectModels(showItems, favoriteDao, projectModels => {
    if (type === DATA_TYPE.popular) {
      dispatch({
        type: Types.POPULAR_LOAD_SUCCESS,
        projectModes: projectModels,
        items,
        storeName,
        pageIndex: 1,
      });
    } else if (type === DATA_TYPE.trending) {
      dispatch({
        type: Types.TRENDING_LOAD_SUCCESS,
        projectModes: projectModels,
        items,
        storeName,
        pageIndex: 1,
      });
    }
  });
}

/**
 *
 * @param {*} showItems
 * @param {*} favoriteDao
 * @param {*} callback
 */
export async function _projectModels(showItems, favoriteDao, callback) {
  const keys = [];
  try {
    keys = await favoriteDao.getFavoriteKeys();
  } catch (e) {
    console.log(e);
  }
  const projectModels = [];
  for (let i = 0, len = showItems.length; i < len; i++) {
    projectModels.push(
      new ProjectModel(
        showItems[i],
        favouriteUtil.checkFavorite(showItems[i], keys),
      ),
    );
  }
  if (typeof callback === 'function') {
    callback(projectModels);
  }
}
