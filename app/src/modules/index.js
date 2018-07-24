import { combineReducers } from 'redux'
import counter from './counter'
import sidebar from './sidebar'

export default combineReducers({
  counter,
  sidebar
})
