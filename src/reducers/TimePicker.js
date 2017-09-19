import { createReducer } from 'redux-act';
import { changeTime } from '../actions/TimePicker';

const initialState = {
  workPicker: {
    id: "workPicker",
    value: 25,
    label: "Work time",
    startColor: [0.56, 0.70, 0.31],
    endColor: [0.94, 0.36, 0.25]
  },
  breakPicker: {
    id: "breakPicker",
    value: 5,
    label: "Break time",
    startColor: [0.94, 0.36, 0.25],
    endColor: [0.56, 0.70, 0.31]
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
