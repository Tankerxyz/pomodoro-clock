import { createReducer } from 'redux-act';
import { setTomato, updateTomato, updateTomatoTimeString } from '../actions/Tomato';

const initialState = {
  activeTimerIndex: 0,
  timeString: '',
  started: false,
  timers: [],
  currentTimeInfoLabel: "",
  passedTime: 0,
  time: 0
};

function getTimeString(time) {
  const min = ~~(time / 60);
  const sec = time % 60;
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}

export default createReducer({
  [setTomato]: (state, { timers, started, startTime }) => {

    let newTimers = [];
    for (let key in timers) {
      newTimers.push({
        id: key,
        time: timers[key].value * 60,
        timerProcessInfoLabel: timers[key].timerProcessInfoLabel
      });
    }

    const activeTimer = newTimers[0];

    return {
      ...state,
      timeString: getTimeString(activeTimer.time),
      timers: newTimers,
      activeTimerIndex: 0,
      started,
      startTime: Date.now()
    }
  },

  [updateTomatoTimeString]: (state, mins) => {
    return {
      ...state,
      timeString: getTimeString(mins * 60)
    }
  },

  [updateTomato]: (state, { onEnd, onEndCycle }) => {

    let activeTimerIndex = state.activeTimerIndex;

    let alreadyPassedTime = 0;
    for (let i = 0; i < activeTimerIndex; ++i) {
      alreadyPassedTime += state.timers[i].time;
    }

    const currentTimer = state.timers[activeTimerIndex];
    const passedTime = ~~((Date.now() - state.startTime) / 10);
    const currentTime = currentTimer.time - (passedTime - alreadyPassedTime);

    const newTimer = {
      ...currentTimer,
      time: currentTimer.time
    };

    const newTimers = [
      ...state.timers
    ];
    newTimers[activeTimerIndex] = newTimer;

    // circling timer logic
    if (currentTime <= 0) {
      const allPassedTime = newTimers.reduce((sum, cur) => sum + cur.time, 0);
      activeTimerIndex = activeTimerIndex + 1 < newTimers.length ? activeTimerIndex + 1 : 0;

      if ((allPassedTime - passedTime) <= 0) {
        onEnd();
      } else {
        onEndCycle(newTimer);
      }
    }

    return {
      ...state,
      activeTimerIndex,
      timers: newTimers,
      timeString: getTimeString(currentTime),
      time: currentTime,
      currentTimeInfoLabel: newTimers[activeTimerIndex].timerProcessInfoLabel,
      passedTime
    }
  }
}, initialState)