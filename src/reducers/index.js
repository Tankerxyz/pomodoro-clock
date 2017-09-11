import { combineReducers } from 'redux';
import timePickerReducer from './TimePicker';
import tomatoReducer from './Tomato';

export default combineReducers({
  timePickers: timePickerReducer,
  tomato: tomatoReducer
});