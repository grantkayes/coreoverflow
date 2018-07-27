import { combineReducers } from 'redux'
import counter from './counter'
import sidebar from './sidebar'
import question from './reducers/questions'

export default combineReducers({
  counter,
  sidebar,
  question
})
