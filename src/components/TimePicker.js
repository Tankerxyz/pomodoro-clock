import React from 'react';
import PropTypes from 'prop-types';

import '../styles/TimePicker.scss';


const TimePicker = (props) => {
  const incrementValue = () => {
    if (props.value >= props.maxValue) { return; }

    props.changeTime(props.id, props.value + 1);
  }

  const decrementValue = () => {
    if (props.value <= props.minValue) { return; }

    props.changeTime(props.id, props.value - 1);
  }

  return (
    <div className="time-picker">
      <div className="controls-wrapper">
        <div className="button increment" onClick={incrementValue}>
          <span className="label">+</span>
        </div>

        <div className="value">{props.value}</div>

        <div className="button decrement" onClick={decrementValue}>
          <span className="label">-</span>
        </div>
      </div>
      <div className="picker-label">{props.label}</div>
    </div>
  );
};

TimePicker.propTypes = {
  value: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  changeTime: PropTypes.func
};

TimePicker.defaultProps = {
  value: 1,
  minValue: 1,
  maxValue: 60
};

export default TimePicker;