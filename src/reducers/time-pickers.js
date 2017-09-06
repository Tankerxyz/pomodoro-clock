import timePickerReducer from './time-picker'

const initialState = {
  breakPicker: {
    value: 5
  },
  workPicker: {
    value: 25
  }
};

export default function timePickersReducer(timePickers = initialState, action) {
  if (!(action.key in timePickers)) return timePickers;

  const timePicker = timePickers[action.key];
  const updatedTimePicker = timePickerReducer(timePicker, action);

  return {
    ...timePickers,
    [action.key]: updatedTimePicker
  }
}

