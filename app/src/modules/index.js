import { combineReducers } from 'redux';
import counter from './counter';
import sidebar from './sidebar';
import answers from './reducers/answers';

export default combineReducers({
  counter,
  sidebar,
  answers
});
