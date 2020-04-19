/*
 * @Description:
 * @Author: myweico
 * @LastEditors: myweico
 * @Date: 2020-03-29 23:15:53
 * @LastEditTime: 2020-04-18 22:48:04
 */

export default class favouriteUtil {
  static checkFavorite(item, items = []) {
    if (!item) return false;
    for (let i = 0, len = items.length; i < len; i++) {
      let id = item.id || item.fullName || '';
      if (id.toString() === items[i]) {
        return true;
      }
    }
    return false;
  }
}
