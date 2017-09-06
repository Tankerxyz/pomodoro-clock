import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as timePickerActions from '../actions/TimePickerActions'

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

    const { timePickers } = this.props;
    const { changeTime } = this.props.timePickerActions;

    return (
      <div className="App">
        Holla
        <TimePicker value={timePickers.breakPicker.value} changeTime={changeTime} id={"breakPicker"} />
      </div>
    );
  }
}

export default App;
