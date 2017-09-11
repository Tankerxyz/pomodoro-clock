import { createAction } from 'redux-act';

export const startTomato = createAction("start tomato");

export const stopTomato = createAction("stop tomato");

export const updateTomato = createAction("update tomato", (onEnd, onEndCycle) => ({ onEnd, onEndCycle }));

export const updateTomatoTimeString = createAction("update tomato time string");