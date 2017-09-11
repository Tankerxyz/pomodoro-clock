import { createReducer } from 'redux-act';
import { changeTime } from '../actions/TimePicker';

const initialState = {
  workPicker: {
    value: 1,
    label: "Work time"
  },
  breakPicker: {
    value: 1,
    label: "Break time"
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
