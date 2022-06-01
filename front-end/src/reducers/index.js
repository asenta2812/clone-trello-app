import { combineReducers } from 'redux'
import boardReducer from './board'
import loadingReducer from './loading'
export default combineReducers({
  board: boardReducer,
  progress: loadingReducer
})