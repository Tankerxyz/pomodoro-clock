import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as timePickerActions from '../reducers/time-picker'

// components
import TimePicker from '../components/TimePicker';
import StartButton from '../components/StartButton';
import Tomato from '../components/Tomato';

//styles
import '../styles/App.scss';

function mapStateToProps(state) {
  return {
    timePickers: state.timePickers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    timePickerActions: bindActionCreators(timePickerActions, dispatch)
  }
}

@connect(mapStateToProps, mapDispatchToProps)
class App extends Component {
  render() {
    console.log(this.props);

    const { workPicker, breakPicker } = this.props.timePickers;
    const { changeTime } = this.props.timePickerActions;

    return (
      <div className="App">
        Holla
        <TimePicker value={breakPicker.value} changeTime={changeTime} id={"breakPicker"} />
        <TimePicker value={workPicker.value} changeTime={changeTime} id={"workPicker"} />
      </div>
    );
  }
}

export default App;
