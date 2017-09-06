import { VALUE_UPDATED } from '../constants/TimePicker';

export default function timePickerReducer(timePicker, action) {
  switch (action.type) {
    case VALUE_UPDATED:
      return {
        ...timePicker,
        value: action.payload
      };
    default:
      return timePicker;
  }
}