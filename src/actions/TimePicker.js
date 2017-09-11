import { createAction } from 'redux-act';

export const changeTime = createAction('change time', (id, value) => ({ id, value }));