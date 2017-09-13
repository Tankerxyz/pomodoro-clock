import { createAction } from 'redux-act';

export const setTomato = createAction("set tomato", (timers, started, startTime) => ({ timers, started, startTime }));

export const updateTomato = createAction("update tomato", (onEnd, onEndCycle) => ({ onEnd, onEndCycle }));