import React, { Component } from 'react';

import '../styles/StartButton.scss';

class StartButton extends Component {

  constructor(props) {
    super(props);

    this.state = {
      playClassName: "fa fa-play",
      stopClassName: "fa fa-stop"
    }
  }

  handleClick = () => {
    if (this.props.started) {
      this.props.stop();
    } else {
      this.props.start();
    }
  }

  render() {
    return (
      <div className="start-button" onClick={this.handleClick}>
        <i className={this.props.started ? this.state.stopClassName : this.state.playClassName}></i>
      </div>
    )
  }
}

export default StartButton;