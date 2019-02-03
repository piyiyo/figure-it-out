import React, {Component} from 'react';
import Modal from './Elements/Modal';
import Countdown from './Elements/Countdown';
import EquationSolver from './Elements/EquationSolver';
import Random from '../../../Utils/Random';

class Frame extends Component {
  constructor(props){
    super(props);
    this.props = props;
    this.state = {
      time: 20,
      currentScore: 0,
      currentTries: 0,
      solutions: [],
      solution: null,
      numberOfSolutions: 12,
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

  handleStartAgain = () => {
    this.state.currentScore = 0;
    this.state.currentTries = 0;
    this.handleNewRound();
    this.handleSetTimer();
  }

  handleStart() {
    $('.intro').fadeOut(200, () => {
      $('.equation').fadeIn(200, () => {
        $('.options').fadeIn(200);
      });
    });
    this.handleSetTimer();
  }

  handleGuessAnswer(event) {
    let answerGuess = event.target.id;
    this.state.currentTries = this.state.currentTries + 1;
    if (this.state.solution == answerGuess) {
      $('#'+answerGuess).addClass("green");
      this.refs.countdown.pauseTimer(true);
    } else {
      if (this.state.currentTries === 3) {
        this.handleShowModal('tries');
        this.refs.countdown.pauseTimer();
      } else {
        $('#'+answerGuess).addClass("red");
      }
    }
    this.setState(this.state);
  }

  handleGetScore = (score) => {
    setTimeout(() => {
      this.state.currentScore = this.state.currentScore + score;
      this.props.handleScore(this.state.currentScore);
      this.state.currentTries = 0;
      this.handleNewRound();
      this.handleSetTimer();
      this.setState(this.state);
    }, 600);
  }

  handleSetTimer() {
    this.refs.countdown.startTimer();
  }

  handleManageScore() {
    if(this.state.currentScore >= 0 && this.state.currentScore < 200) {
      return {level: 1, equationLength: 2, strength: 10}; //Beginner
    } else if(this.state.currentScore >= 200 && this.state.currentScore < 400) {
      return {level: 2, equationLength: 3, strength: 20}; //Skilled
    } else if(this.state.currentScore >= 400 && this.state.currentScore < 600) {
      return {level: 3, equationLength: Math.floor((Math.random() * 2) + 4), strength: 100}; //Professional
    } else if(this.state.currentScore >= 600 && this.state.currentScore < 800) {
      return {level: 4, equationLength: Math.floor((Math.random() * 2) + 5), strength: 500}; //Epic
    } else {
      return {level: 5, equationLength: Math.floor((Math.random() * 2) + 6), strength: 1000}; //Legendary
    }
  }

  handleNewRound() {
    let properties = this.handleManageScore();
    let numbers = this.prepareEquationNumbers(properties);
    let equationParams = {
      equationLength: properties.equationLength,
      solutions: this.state.numberOfSolutions,
      numbers : numbers
    };
    let equationSolver = new EquationSolver(equationParams);
    let solvedEquation = equationSolver.solveEquation();
    let equation = solvedEquation.equation;
    let solution = solvedEquation.solution
    let solutions = this.renderSolutions(solvedEquation.solutions, solution);
    this.state.equation = equation;
    this.state.solution = solution;
    this.state.solutions = solutions;
    this.setState(this.state);
  }

  prepareEquationNumbers(properties) {
    let numbersArray = [];
    for (let i=0; i<properties.equationLength; i++) {
      numbersArray.push(Math.floor(Math.random()*properties.strength));
    }
    return numbersArray;
  }

  renderSolutions(solutions, solution) {
    let renderSolutions = [];
    let positionOfCorrectAnswer = Math.floor(Math.random()*12)
    let i = 0;
    while(renderSolutions.length <= solutions.length+1) {
      if (i === positionOfCorrectAnswer) {
        renderSolutions.push(<div key={Random.generate()} id={solution}
         onClick={this.handleGuessAnswer.bind(this)} className="col-md-2 col-xs-4 solution">{solution}</div>)
      } else {
        renderSolutions.push(<div key={Random.generate()} id={solutions[i]}
         onClick={this.handleGuessAnswer.bind(this)} className="col-md-2 col-xs-4 solution">{solutions[i]}</div>)
      }
      i++;
    }

    return renderSolutions;
  }

  render() {
    return (
      <div>
        <Countdown time={this.state.time} handleGetScore={this.handleGetScore} handleShowModal={this.handleShowModal} ref="countdown"/>
        <div className="container">
          <div className="content">
          <div className="equation" style={{display:'none'}}>Solve: {this.state.equation}</div>
          <div className="limiter">
          <div className="intro">
            <div className="how-to">
              <p className="p-title">How to play</p>
              <p>To calculate the result just apply the operators priority and solve the operation.</p>
              <p>You have 20 seconds for each round and 3 tries to guess the correct answer. The higher the score, the more difficult the opertions become.</p>
              <p>The game settings can be adjusted in the <span style={{color:'#ca3434'}}>menu button</span> located in the upper left corner.</p>
            </div>
            <div className="ready">
              <a href="#" id="play" className="play" data-dismiss="modal" data-text="Play Here" onClick={this.handleStart.bind(this)}>
                <span>I</span> <span>a</span><span>m</span> <span>r</span><span>e</span><span>a</span><span>d</span><span>y</span>
              </a>
            </div>
          </div>
          <div className="options" style={{display:'none'}}>
            {this.state.solutions}
          </div>
          </div>
          </div>
        </div>
        <Modal vars={this.continueModalData} handleStartAgain={this.handleStartAgain} />
        <Modal vars={this.timeupModalData} handleStartAgain={this.handleStartAgain} />
        <Modal vars={this.triesModalData} handleStartAgain={this.handleStartAgain} />
      </div>
    );
  }
}
export default Frame;
