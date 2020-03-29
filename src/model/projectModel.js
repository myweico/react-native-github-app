/**
 * 带收藏状态的 item
 * @param {object} item 
 * @param {string} isFavorite 
 */
export default function ProjectModel(item, isFavorite) {
  this.item = item;
  this.isFavorite = isFavorite;
}