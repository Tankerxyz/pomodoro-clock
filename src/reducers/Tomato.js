import { createReducer } from 'redux-act';
import { setTomato, updateTomato, updateTomatoTimeString } from '../actions/Tomato';

const initialState = {
  activeTimerIndex: 0,
  timeString: '',
  started: false,
  timers: [],
  currentTimeInfoLabel: ""
};

function getTimeString(time) {
  const min = ~~(time / 60);
  const sec = time % 60;
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}

export default createReducer({
  [setTomato]: (state, { timers, started }) => {

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
      started: started
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
    const currentTimer = state.timers[activeTimerIndex];
    const currentTime = currentTimer.time - 1;

    const newTimer = {
      ...currentTimer,
      time: currentTime
    };

    const newTimers = [
      ...state.timers
    ];
    newTimers[activeTimerIndex] = newTimer;

    // circling timer logic
    if (!currentTime) {
      activeTimerIndex = activeTimerIndex + 1 < newTimers.length ? activeTimerIndex + 1 : 0;

      if (!newTimers[activeTimerIndex].time) {
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
      currentTimeInfoLabel: newTimers[activeTimerIndex].timerProcessInfoLabel
    }
  }
}, initialState)