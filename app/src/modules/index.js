import { combineReducers } from 'redux'
import counter from './counter'
import sidebar from './sidebar'
import question from './reducers/questions'
import answers from './reducers/answers';
import user from './reducers/user';

export default combineReducers({
  counter,
  sidebar,
  answers,
  user,
  question,
});
