import React, { Component } from 'react';
import '../styles/Tomato.scss';

class Tomato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      h_timer: null
    }

    if (this.props.started) {
      setTimeout(this.startTimer.bind(this), 0)
    }
  }

  startTimer = () => {
    this.setState({
      h_timer: setInterval(this.props.updateTomato, 10)
    });
  }

  stopTimer = () => {
    clearInterval(this.state.h_timer);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.started && !this.props.started) {
      this.startTimer();
    } else if (!newProps.started && this.props.started) {
      this.stopTimer();
    }
  }

  render() {
    return (
      <div className="tomato">
        <div className="status">
          {
            this.props.started ? this.props.label : null
          }
        </div>
        <div>
          {
            this.props.passedTime
          }
        </div>
        <div>
          {
            " time: " + this.props.time
          }
        </div>
        <div className="time">
          {this.props.timeString}
        </div>
      </div>
    )
  }
}

export default Tomato;