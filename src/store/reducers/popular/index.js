import Types from '../../actions/types';

const defaultState = {};

/**
 * 最热模块的 reducer
 * {
 *    android: {
 *        items: [],
 *        loading: false,
 *        offset: 0
 *    },
 *    ios: {
 *        items: [],
 *        loading: false
 *    }
 * }
 * @param {object} state 状态
 * @param {object} action 行为
 */
export default function popularReducer(state = defaultState, action) {
  const {storeName} = action;
  switch (action.type) {
    case Types.POPULAR_REFRESH:
      // 触发下拉刷新
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          isLoading: true,
          hideLoadingMore: true
        },
      };
    case Types.POPULAR_LOAD_SUCCESS:
      // 下拉刷新成功
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
    case Types.POPULAR_LOAD_FAIL:
      // 下拉失败
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          isLoading: false,
        },
      };
    case Types.POPULAR_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [storeName]: {
          ...state[storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };
    case Types.POPULAR_LOAD_MORE_FAIL:
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
