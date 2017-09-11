import React, { Component } from 'react';
import '../styles/Tomato.scss';

class Tomato extends Component {
  constructor(props) {
    super(props);

    this.state = {
      h_timer: null
    }

  }

  startTimer() {
    this.setState({
      h_timer: setInterval(this.props.updateTomato, 10)
    })
  }

  stopTimer() {
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