import { combineReducers } from 'redux';
import timePickersReducer from './time-picker';

export default combineReducers({
  timePickers: timePickersReducer
});