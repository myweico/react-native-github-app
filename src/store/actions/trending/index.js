import Types from '../types';
import {LocalFirstStore, DATA_TYPE} from '../../../utils/storageUtil';
import { handleData } from '../actionUtils';

/**
 * 获取趋势数据的异步 action
 * @param {string} storeName tab 对应的分类
 * @param {string} url 请求的路径
 */
export function onLoadTrendingData(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: Types.TRENDING_REFRESH, storeName});
    LocalFirstStore.fetchData(url, DATA_TYPE.trending) // 异步action 与 数据流
      .then(data => {
        handleData(DATA_TYPE.trending, dispatch, storeName, data, pageSize);
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: Types.TRENDING_LOAD_FAIL,
          storeName,
          error: err,
        });
      });
  };
}

export function onLoadMoreTrending(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callback,
) {
  return dispatch => {
    setTimeout(() => {
      // 模拟网络请求
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        if (typeof callback === 'function') {
          callback('no more');
        }
        dispatch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: pageIndex - 1,
          projectModes: dataArray,
        });
      } else {
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex;
        dispatch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 1000);
  };
}
