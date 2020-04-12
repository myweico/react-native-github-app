/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-29 15:25:30
 * @LastEditTime: 2020-04-12 10:24:03
 */
import {AsyncStorage} from 'react-native';

const FAVORITE_KEY_PREFIX = 'favourite__';

export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }

  saveFavoriteItem(key, value, callback) {
    AsyncStorage.setItem(key, value, (error, result) => {
      if (!error) {
        // 保存添加的key
        this.updateFavoriteKeys(key, true);
      }
    });
  }

  updateFavoriteKeys(key, isAdd) {
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        try {
          if (result) {
            favoriteKeys = JSON.parse(result);
          }
        } catch (err) {
          console.log(err);
        }
        let index = favoriteKeys.indexOf(key);
        if (isAdd) {
          if (index === -1) {
            favoriteKeys.push(key);
          }
        } else {
          // 删除
          if (index !== -1) {
            // 若存在对应的键值,将其移除
            favoriteKeys.splice(index, 1);
          }
        }
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    });
  }

  /**
   * 获取收藏的 Repository 对应的key
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result || '[]'));
          } catch (e) {
            reject(e);
          }
        } else {
          reject(error);
        }
      });
    });
  }

  /**
   * 取消收藏
   * @param {*} key
   */
  removeFavoriteItem(key) {
    AsyncStorage.removeItem(key, (error, result) => {
      if (!error) {
        this.updateFavoriteKeys(key, false);
      }
    });
  }

  /**
   * 获取所有的单元
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then(keys => {
          let items = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (err, stores) => {
              try {
                stores.map(store => {
                  const key = store[0];
                  const value = store[1];
                  if (value) items.push(JSON.parse(value || ''));
                });
                resolve(items);
              } catch (e) {
                reject(e);
              }
            });
          } else {
            resolve(items);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
