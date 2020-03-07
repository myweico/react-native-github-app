import {AsyncStorage} from 'react-native';
import Trending from 'GitHubTrending';

const DATA_TYPE = {popular: 'popular', trending: 'trending'};

class LocalFirstStore {
  /**
   * 保存数据
   * @param {string} url
   * @param {string, object, array} data
   */
  static saveData(url, data) {
    if (!data || !url) return console.error('保存数据的参数不正确');

    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data))).catch(
      err => {
        throw err;
      },
    );
  }

  /**
   * 包裹数据
   * @param {string, object, array} data
   */
  static _wrapData(data) {
    return {
      data,
      timestamp: new Date().getTime(),
    };
  }

  static fetchData(url, type) {
    // 查看本地时间是否存在
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(data => {
          resolve(data);
        })
        .catch(() => {
          // 本地数据失效,获取网络数据
          if (type === DATA_TYPE.popular) {
            this.fetchNetData(url)
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                reject(err);
              });
          } else {
            // 获取趋势数据
            new Trending()
              .fetchTrending(url)
              .then(items => {
                if (!items) {
                  throw new Error('responseData is null');
                }
                this.saveData(url, items);
                resolve(items);
              })
              .catch(err => {
                reject(err);
              });
          }
        });
    });
  }

  /**
   * 获取本地的数据
   * @param {string} url
   */
  static fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url)
        .then(dataJson => {
          if (!dataJson) {
            // 数据不存在
            return reject();
          }

          let dataObj;
          try {
            dataObj = JSON.parse(dataJson);
          } catch (err) {
            // 解析错误，数据不存在
            console.error(err);
            return reject(err);
          }
          const {timestamp, data} = dataObj;
          if (!this.checkTimestampValid(timestamp)) {
            // 数据过期
            return reject();
          }
          resolve(data);
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
  }

  /**
   * 获取网络数据
   * @param {string} url
   */
  static fetchNetData(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          reject(new Error('Network response was not ok'));
        })
        .then(data => {
          this.saveData(url, data);
          resolve(data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  static checkTimestampValid(timestamp) {
    const curTimestamp = new Date();
    if (curTimestamp - timestamp > 4 * 60 * 60 * 1000) {
      // 4 个小时的有效期
      return false;
    }
    return true;
  }
}

export {LocalFirstStore, DATA_TYPE};
