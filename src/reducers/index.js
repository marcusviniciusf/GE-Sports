import { combineReducers } from 'redux';
// Reducers
import jogosReducer from './jogosReducer';
import jogoReducer from './jogoReducer';

export default combineReducers({
  jogosReducer,
  jogoReducer
});
