import { createReducer } from 'redux-act';
import { setTomato, updateTomato } from '../actions/Tomato';
import { getStepUpdatingColor, getCurrentColor } from '../utils/';

const initialState = {
  activeTimerIndex: 0,
  started: false,
  timers: [],
  time: 0,
  currentColor: [],
  initialisated: false
};

export default createReducer({
  [setTomato]: (state, { timers, started, startTime }) => {

    let newTimers = [];
    for (let key in timers) {
      const t = timers[key]
      const time = t.value * 60

      newTimers.push({
        id: key,
        time,
        startColor: t.startColor,
        label: t.label,
        endColor: t.endColor,
        stepUpdatingColor: getStepUpdatingColor(t.startColor, t.endColor, time)
      });
    }

    const activeTimer = newTimers[0];

    return {
      ...state,
      initialisated: true,
      time: activeTimer.time,
      timerTime: activeTimer.time,
      timers: newTimers,
      activeTimerIndex: 0,
      startTime: Date.now(),
      currentColor: activeTimer.startColor,
      started,
    }
  },

  [updateTomato]: (state, { onEnd, onEndCycle }) => {
    const timers = state.timers;
    let activeTimerIndex = state.activeTimerIndex;

    let alreadyPassedTime = 0;
    for (let i = 0; i < activeTimerIndex; ++i) {
      alreadyPassedTime += timers[i].time;
    }

    const currentTimer = timers[activeTimerIndex];
    const passedTime = ~~((Date.now() - state.startTime) / 1000);
    const currentTime = currentTimer.time - (passedTime - alreadyPassedTime);

    const { startColor, stepUpdatingColor } = currentTimer;
    const currentColor = getCurrentColor(startColor, stepUpdatingColor, currentTimer.time - currentTime);

    // circling timer logic
    if (currentTime <= 0) {
      const allPassedTime = timers.reduce((sum, cur) => sum + cur.time, 0);
      activeTimerIndex = activeTimerIndex + 1 < timers.length ? activeTimerIndex + 1 : 0;

      if ((allPassedTime - passedTime) <= 0) {
        onEnd();
      } else {
        onEndCycle(currentTimer);
      }
    }

    return {
      ...state,
      timers: [
        ...timers
      ],
      timerTime: timers[activeTimerIndex].time,
      time: currentTime,
      passedTime,
      currentColor,
      activeTimerIndex
    }
  }
}, initialState)