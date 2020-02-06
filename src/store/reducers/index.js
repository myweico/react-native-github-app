import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';

const rootReducer = combineReducers({
  theme,
  popular,
});

export default rootReducer;
