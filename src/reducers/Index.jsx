import { combineReducers } from 'redux'
import user from './User'
import paper from './Paper'
import bill from './Bill'

export default combineReducers({
  user,
  paper,
  bill
})
