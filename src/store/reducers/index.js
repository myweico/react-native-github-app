import {combineReducers} from 'redux';
import theme from './theme';
import popular from './popular';
import trending from './trending';
import favorite from './favorite'

const rootReducer = combineReducers({
  theme,
  popular,
  trending,
  favorite
});

export default rootReducer;
