import { combineReducers } from 'redux';
import timePickersReducer from './time-pickers';

export default combineReducers({
  timePickers: timePickersReducer
});