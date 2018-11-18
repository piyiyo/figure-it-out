import React, {Component} from 'react';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.props = props
    this.state = { time: {}, seconds: this.props.time};
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.time) {
      this.state.seconds = nextProps.time;
    }
    this.setState(this.state);
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    // Check if we're at zero.
    if (seconds == 0) {
      clearInterval(this.timer);
      this.props.handleShowModal('timeup');
    }
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.props.handleGetScore(this.state.seconds);
  }

  render() {
    return(
      <div className="countdown">
        {this.state.time.s} s
      </div>
    );
  }
}
export default Countdown;
