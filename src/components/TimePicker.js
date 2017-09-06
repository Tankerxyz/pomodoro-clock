import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import '../styles/TimePicker.scss';

class TimePicker extends Component {
  static propTypes = {
    value: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
    changeTime: PropTypes.func
  };

  static defaultProps = {
    value: 0,
    minValue: 0,
    maxValue: 60
  };

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value,
      mouseDown: false
    }
  }

  debounce = (fn, time) => {
    setTimeout(fn, time);
  }

  incrementValue = () => {
    if (this.props.value >= this.props.maxValue) { return; }

    this.props.changeTime(this.props.id, this.props.value + 1);

    this.setState({
      mouseDown: true
    });

    this.debounce(() => {
      if(this.state.mouseDown) {
        this.incrementValue();
      }
    }, 100);
  }

  decrementValue = () => {
    if (this.props.value <= this.props.minValue) { return; }

    this.props.changeTime(this.props.id, this.props.value - 1);

    this.setState({
      mouseDown: true
    });

    this.debounce(() => {
      if(this.state.mouseDown) {
        this.decrementValue();
      }
    }, 100);
  }

  onMouseUp = () => {
    this.setState({
      mouseDown: false
    })
  }


  render() {
    return (
      <div className="time-picker">
        <div className="button increment" onMouseDown={this.incrementValue} onMouseUp={this.onMouseUp}>
          <span className="label">+</span>
        </div>

          {this.props.value}

        <div className="button decrement" onMouseDown={this.decrementValue} onMouseUp={this.onMouseUp}>
          <span className="label">-</span>
        </div>
      </div>
    );
  }
}

export default TimePicker;