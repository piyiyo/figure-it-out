import React, {Component} from 'react';
import Modal from './Elements/Modal';
import Countdown from './Elements/Countdown';

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
      return {level: 1, equationLength: 2}; //Beginner
    } else if(this.state.currentScore >= 200 && this.state.currentScore < 400) {
      return {level: 2, equationLength: 3}; //Skilled
    } else if(this.state.currentScore >= 400 && this.state.currentScore < 600) {
      return {level: 3, equationLength: Math.floor((Math.random() * 2) + 4)}; //Professional
    } else if(this.state.currentScore >= 600 && this.state.currentScore < 800) {
      return {level: 4, equationLength: Math.floor((Math.random() * 2) + 5)}; //Epic
    } else {
      return {level: 5, equationLength: Math.floor((Math.random() * 2) + 6)}; //Legendary
    }
  }

  handleParentheses(equationLength) {
    //Probability of finding a parentheses in equation
    let randomProbability = Math.floor((Math.random() * 10) + 1);
    let randomChange = Math.floor((Math.random() * 10) + 1);
    let parentheses = false;
    if(randomChange <= randomProbability) {
      parentheses = true;
    }
    //Number of chars inside the parentheses
    let parenthesesNumber = 0;
    if(equationLength >= 0 && equationLength < 6 && parentheses) {
      parenthesesNumber = 1;
    }
    if(equationLength >= 6 && equationLength < 9 && parentheses) {
      parenthesesNumber = 2;
    }
    return {parentheses: parentheses, parenthesesNumber: parenthesesNumber};
  }

  handleOperator() {
    let operatorsArray = [
      {operatorText: '+', operator: '+'},
      {operatorText: '-', operator: '-'},
      {operatorText: 'x', operator: '*'},
      {operatorText: '÷', operator: '/'},
    ];
    let randomOperator = Math.floor((Math.random() * 4));
    return operatorsArray[randomOperator];
  }

  handleSameOperator(operation) {
    let previousChar = '';
    let newOperation = '';
    for(let i=0; i<(operation.length-1); i++) {
      if(i === 0) {
        previousChar = operation.substr(0, 1);
        newOperation = previousChar;
      } else {
        previousChar = operation.substr(i-1, i);
        if (previousChar === '-' && operation.substr(i, i+1)) {
          newOperation += '+';
        } else {
          newOperation += operation.substr(i, i+1);
        }
      }
    }
    return newOperation;
  }

  handleEquationSolver(equation) {
    let hasParentheses = equation.includes("(");
    let totalValue = 0;
    if(hasParentheses) {
      let parenthesesValue = 0;
      let regExp = /\(([^)]+)\)/;
      let matches = regExp.exec(equation);
      parenthesesValue = eval(matches[0]);

      if(equation.indexOf('(') !== 0 && equation.indexOf(')') === (equation.length - 1)) {
        let firstEquationPart = equation.substr(0, equation.indexOf('(') - 1);
        let operatorInBetween = equation.substr(equation.indexOf('(') - 1, 1);
        let total = firstEquationPart+operatorInBetween+parenthesesValue;
        let correctedTotal = this.handleSameOperator(total);
        console.log(equation);
        console.log(total);
        console.log(correctedTotal);
        totalValue = eval(correctedTotal);
      }
      if(equation.indexOf('(') === 0) {
        let secondEquationPart = equation.substr(equation.indexOf(')') + 2, equation.length - 1);
        let operatorInBetween = equation.substr(equation.indexOf(')') + 1, 1);
        let total = parenthesesValue+operatorInBetween+secondEquationPart;
        totalValue = eval(total);
      }
      if(equation.indexOf('(') !== 0 && equation.indexOf(')') !== (equation.length - 1)) {
        let firstEquationPart = equation.substr(0, equation.indexOf('(') - 1);
        let secondEquationPart = equation.substr(equation.indexOf(')') + 2, equation.length - 1);
        let firstOperatorInBetween = equation.substr(equation.indexOf('(') - 1, 1);
        let secondOperatorInBetween = equation.substr(equation.indexOf(')') + 1, 1);
        let total = firstEquationPart+firstOperatorInBetween+parenthesesValue+secondOperatorInBetween+secondEquationPart;
        totalValue = eval(total);
      }
    } else {
      totalValue = eval(equation);
    }
    return totalValue;
  }

  handleNewRound() {
    let scoreData = this.handleManageScore();
    let level = scoreData.level;
    let parentheses = this.handleParentheses(scoreData.equationLength);

    let parenthesesFirstPosition = Math.floor((Math.random() * (scoreData.equationLength - 1)));
    let parenthesesSecondPosition = 0;

    if(scoreData.equationLength <= 2) {
      parentheses.parentheses = false;
    } else {
      if(parentheses.parenthesesNumber === 1) {
        if((scoreData.equationLength - 1) - parenthesesFirstPosition === 1) {
          parenthesesSecondPosition = scoreData.equationLength - 1;
        } else if(scoreData.equationLength - parenthesesFirstPosition === scoreData.equationLength) {
          parenthesesSecondPosition = Math.floor((Math.random() * (scoreData.equationLength - 2)) + 1);
        } else {
          parenthesesSecondPosition = Math.floor(Math.random() * ((scoreData.equationLength - 1) - (parenthesesFirstPosition + 1) + 1)) + (parenthesesFirstPosition + 1);
        }
      } else {
        //TODO: implement more than one pair of parentheses
      }
    }

    let equation = '';
    let equationText = '';
    let solution = 0;
    let number = 0;
    let operatorData = '';

    for(let i=0; i<scoreData.equationLength; i++) {
      number = Math.floor((Math.random() * 9) + 1);
      operatorData = this.handleOperator();
      if (i === 0) {
        if(parentheses.parentheses && parenthesesFirstPosition === i) {
          equation = '('+number;
          equationText = '('+number;
        } else {
          equation = number;
          equationText = equation;
        }
      } else {
        if(parentheses.parentheses && parenthesesFirstPosition === i) {
          equation = equation+operatorData.operator+'('+number;
          equationText = equationText+operatorData.operatorText+'('+number;
        } else if(i === parenthesesSecondPosition && parentheses.parentheses) {
          equation = equation+operatorData.operator+number+')';
          equationText = equationText+operatorData.operatorText+number+')';
        } else {
          equation = equation+operatorData.operator+number;
          equationText = equationText+operatorData.operatorText+number;
        }
      }
    }
    this.state.equation = equationText;
    solution = this.handleEquationSolver(equation);
    let possibleSolutionsArray = [];
    let randomIndexSolution = Math.floor(Math.random() * 11);
    let operatorsArray = ["+", "-"];
    if(!solution.toString().includes(".")) {
      for(let i=0; i<12; i++) {
        let randomSolution = eval(solution+operatorsArray[Math.floor(Math.random() * 2)]+Math.floor((Math.random() * 12) + 1));
        if(randomIndexSolution === i) {
          possibleSolutionsArray.push(solution.toString());
        } else {
          if(!possibleSolutionsArray.includes(randomSolution.toString()) && randomSolution !== solution) {
            possibleSolutionsArray.push(randomSolution.toString());
          }
        }
      }
    } else {
      solution = solution.toFixed(2);
      for(let i=0; i<12; i++) {
        let randomSolution = eval(solution+operatorsArray[Math.floor(Math.random() * 2)]+(Math.random() * 12));
        randomSolution = randomSolution.toFixed(2);
        if(randomIndexSolution === i) {
          possibleSolutionsArray.push(solution.toString());
        } else {
          if(!possibleSolutionsArray.includes(randomSolution.toString()) && randomSolution !== solution) {
            possibleSolutionsArray.push(randomSolution.toString());
          }
        }
      }
    }
    this.state.currentAnswer = solution.toString();
    console.log(possibleSolutionsArray);
    possibleSolutionsArray.forEach((elem) => {
      this.state.answers.push(<div className="response btn" key={'ans_'+elem} id={elem} onClick={this.handleGuessAnswer.bind(this)}>{elem}</div>);
    });
    this.setState(this.state);
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
