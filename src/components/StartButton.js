import React, { Component } from 'react';

import '../styles/StartButton.scss';

class StartButton extends Component {

  render() {
    return (
      <div className="start-button"
        onClick={this.props.start}>
        <div className={this.props.started ? "stop" : "start"}></div>
      </div>
    )
  }
}

export default StartButton;