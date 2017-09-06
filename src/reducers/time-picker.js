import { createAction, createReducer } from 'redux-act';

const initialState = {
  breakPicker: {
    value: 5
  },
  workPicker: {
    value: 25
  }
};

export const changeTime = createAction('change time', (id, value) => ({ id, value }));

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
