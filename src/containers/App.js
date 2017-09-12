import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as timePickerActions from '../actions/TimePicker'
import * as tomatoActions from '../actions/Tomato'

// components
import TimePicker from '../components/TimePicker';
import StartButton from '../components/StartButton';
import Tomato from '../components/Tomato';

//styles
import '../styles/App.scss';

function mapStateToProps(state) {
  return {
    timePickers: state.timePickers,
    tomato: state.tomato
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timePickerActions: bindActionCreators(timePickerActions, dispatch),
    tomatoActions: bindActionCreators(tomatoActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alarmSound: new Audio('/sound/end-tomato-alarm.mp3'),
      cycleSound: new Audio('/sound/cycle.mp3'),
      isEnabledNotification: false
    };

    if (window.Notification) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          this.setState({
            isEnabledNotification: true
          })
        }
      })
    }

    if (!this.props.tomato.timeString) {
      this.initTomato();
    }
  }

  initTomato = () => {
    this.props.tomatoActions.setTomato(this.props.timePickers, false);
  }

  onEndCycle = (endedTimerLabel) => {
    this.state.cycleSound.play();
    if (this.state.isEnabledNotification) {
      new Notification(`${this.props.tomato.currentTimeInfoLabel} was ended`);
    }
  }

  onStartTomato = () => {
    this.state.cycleSound.play();
    this.props.tomatoActions.setTomato(this.props.timePickers, true);
  }

  onStopTomato = () => {
    this.props.tomatoActions.setTomato(this.props.timePickers, false);
    if (this.state.isEnabledNotification) {
      new Notification(`Tomato was ended`);
    }
  }

  onEndTomato = () => {
    this.state.alarmSound.play();
    setTimeout(this.onStopTomato, 0);
  }

  onChangeWorkPicker = (id, newValue) => {
    this.props.timePickerActions.changeTime(id, newValue);
    if (!this.props.tomato.started) {
      this.props.tomatoActions.updateTomatoTimeString(newValue)
    }
  }

  onUpdateTomato = () => {
    this.props.tomatoActions.updateTomato(this.onEndTomato.bind(this), this.onEndCycle.bind(this));
  }

  render() {
    const { workPicker, breakPicker } = this.props.timePickers;
    const { changeTime } = this.props.timePickerActions;
    const { startTomato, updateTomato, updateTomatoTimeString } = this.props.tomatoActions;
    const { started, time, timeString, currentTimeInfoLabel, passedTime } = this.props.tomato;

    return (
      <div className="app">
        <div className="controls-container">
          <TimePicker label={breakPicker.label} value={breakPicker.value} changeTime={changeTime} id={"breakPicker"} minValue={5} maxValue={30} />
          <StartButton started={started} start={this.onStartTomato} stop={this.onStopTomato} />
          <TimePicker label={workPicker.label} value={workPicker.value} changeTime={this.onChangeWorkPicker} id={"workPicker"} minValue={5} />
        </div>
        <Tomato
          passedTime={passedTime}
          started={started}
          label={currentTimeInfoLabel}
          time={time}
          timeString={timeString}
          updateTomato={this.onUpdateTomato.bind(this)} />
      </div>
    );
  }
}

export default App;