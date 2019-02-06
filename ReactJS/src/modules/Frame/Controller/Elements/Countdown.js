import React, {Component} from 'react';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.props = props
    this.state = {
      time: this.props.time
    };
    this.countDown = this.countDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.time) {
      this.state.time = nextProps.time;
    }
    this.setState(this.state);
  }

  startTimer() {
    clearInterval(this.timer);
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown() {
    let time = this.state.time-1;
    if (this.state.time > 0) {
      this.setState({time: time});
    } else {
      clearInterval(this.timer);
      this.props.handleShowModal('timeup');
    }
  }

  pauseTimer(nextRound) {
    clearInterval(this.timer);
    if (nextRound) {
      this.props.handleGetScore(this.state.time);
    }
  }

  render() {
    return(
      <div className="countdown">
        {this.state.time} s
      </div>
    );
  }
}
export default Countdown;
