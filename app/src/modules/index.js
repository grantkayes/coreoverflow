import { combineReducers } from 'redux'
import counter from './counter'
import sidebar from './sidebar'
import question from './reducers/questions'
import answers from './reducers/answers';

export default combineReducers({
  counter,
  sidebar,
  question,
  answers
});
