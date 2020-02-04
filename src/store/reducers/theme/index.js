import Types from '../../actions/types'

const defaultState = {
  theme: 'red',
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state;
  }
}
