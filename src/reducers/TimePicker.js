import { createReducer } from 'redux-act';
import { changeTime } from '../actions/TimePicker';

const initialState = {
  workPicker: {
    id: "workPicker",
    value: 6,
    label: "Work time",
    timerProcessInfoLabel: "Work"
  },
  breakPicker: {
    id: "breakPicker",
    value: 6,
    label: "Break time",
    timerProcessInfoLabel: "Break"
  }
};

export default createReducer({
  [changeTime]: (state, { id, value }) => {
    if (!state[id]) { return state; }

    return {
      ...state,
      [id]: {
        ...state[id],
        value
      }
    }
  }
}, initialState);
