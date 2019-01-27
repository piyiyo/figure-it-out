import React, {Component} from 'react';
import Modal from './Elements/Modal';
import Countdown from './Elements/Countdown';
import EquationSolver from './Elements/EquationSolver';

class Frame extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      time: 20,
      currentAnswer: '',
      currentScore: 450,
      currentTries: 0,
      answers: [],
      difficulty: props.difficulty
    };
    this.continueModalData = {
      target: 'continue',
      data: 'Continue?',
      text: <div><p style={{fontWeight:'bold'}}>You made it!</p>
      <p>Your score has increased! Now you can continue playing by facing more challenging operations ;)</p></div>
    };
    this.timeupModalData = {
      target: 'timeup',
      data: 'Try Again?',
      text: <div><p style={{fontWeight:'bold'}}>TIME'S UP!</p>
      <p>Ooohhh :(</p>
      <p>Maybe you can try again and see how far you can go!</p></div>
    };
    this.triesModalData = {
      target: 'tries',
      data: 'Try Again?',
      text: <div><p style={{fontWeight:'bold'}}>YOU RAN OUT OF TRIES!</p>
      <p>Ooohhh :(</p>
      <p>Maybe you can try again and see how far you can go!</p></div>
    };
  }

  componentDidMount() {
    this.handleNewRound();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.difficulty) {
      this.setState({difficulty: nextProps.difficulty});
    }
  }

  handleShowModal = (modal) => {
    $('#'+modal).modal('show');
  }

  handleStart() {
    $('.intro').fadeOut(300, () => {
      $('.options').fadeIn(300);
    });
    this.setState({time: 30});
  }

  handleGuessAnswer(event) {
    let answerGuess = event.target.id;
    if(this.state.currentAnswer === answerGuess) {
      $('#'+answerGuess).addClass("green");
      this.state.currentAnswer = '';
      this.state.answers = [];
      this.refs.countdown.pauseTimer();
    } else {
      $('#'+answerGuess).addClass("red");
      this.state.currentTries = this.state.currentTries + 1;
    }
    this.setState(this.state);
  }

  handleGetScore = (score) => {
    this.state.currentScore += score;
    this.handleNewRound();
    this.setState(this.state);
  }

  handleSetTimer() {
    this.refs.countdown.startTimer();
  }

  handleManageScore() {
    if(this.state.currentScore >= 0 && this.state.currentScore < 200) {
      return {level: 1, equationLength: 2, strength: 20}; //Beginner
    } else if(this.state.currentScore >= 200 && this.state.currentScore < 400) {
      return {level: 2, equationLength: 3, strength: 100}; //Skilled
    } else if(this.state.currentScore >= 400 && this.state.currentScore < 600) {
      return {level: 3, equationLength: Math.floor((Math.random() * 2) + 4), strength: 500}; //Professional
    } else if(this.state.currentScore >= 600 && this.state.currentScore < 800) {
      return {level: 4, equationLength: Math.floor((Math.random() * 2) + 5), strength: 1000}; //Epic
    } else {
      return {level: 5, equationLength: Math.floor((Math.random() * 2) + 6), strength: 10000}; //Legendary
    }
  }

  handleNewRound() {
    let properties = this.handleManageScore();
    let numbers = this.prepareEquationNumbers(properties);
    let equationParams = {
      equationLength: properties.equationLength,
      solutions: this.state.solutions,
      numbers : numbers
    };
    let equationSolver = new EquationSolver(equationParams);
    let solvedEquation = equationSolver.solveEquation();
  }

  prepareEquationNumbers(properties) {
    let numbersArray = [];
    for (let i=0; i<properties.equationLength; i++) {
      numbersArray.push(Math.floor(Math.random()*properties.strength));
    }
    return numbersArray;
  }

  render() {
    
    return (
      <div>
        <Countdown time={this.state.time} handleGetScore={this.handleGetScore} handleShowModal={this.handleShowModal} ref="countdown"/>
        <div className="container">
          <div className="content">
          <div className="equation">Solve: {this.state.equation}</div>
          <div className="limiter">
          <div className="intro">
            <div className="how-to">
              <p className="p-title">How to play</p>
              <p>To calculate the result just read the operation from left to right without any operator priority. For instance:</p>
              <p>4x7+4/4 should be calculated as:</p>
              <p>4x7 = 28 +4 = 32 /4 = <span style={{color:'#ca3434'}}>8</span></p>
            </div>
            <div className="ready">
              <a href="#" id="play" className="play" data-dismiss="modal" data-text="Play Here" onClick={this.handleStart.bind(this)}>
                <span>I</span> <span>a</span><span>m</span> <span>r</span><span>e</span><span>a</span><span>d</span><span>y</span>
              </a>
            </div>
          </div>
          <div className="options" style={{display:'none'}}>
            {this.state.answers}
          </div>
          </div>
          </div>
        </div>
        <Modal vars={this.continueModalData} />
        <Modal vars={this.timeupModalData} />
        <Modal vars={this.triesModalData} />
      </div>
    );
  }
}
export default Frame;
