import React, {Component} from 'react';
import Elementary from './Operations/Elementary';

class EquationSolver extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            equationLength: props.equationLength,
            solutions: props.solutions,
            numbers: props.numbers
        };
        this.elementary = new Elementary();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps) {
            this.setState({
                equationLength: nextProps.equationLength,
                solutions: nextProps.solutions,
                numbers: nextProps.numbers
            });
        }
    }

    solveEquation() {
        let operators = this.getOperators(this.state.numbers);
        let equation = this.getEquation(operators);
        let correctSolution = this.getResult(this.state.numbers, operators);
        if (correctSolution % 1 !== 0) {
            correctSolution = correctSolution.toFixed(1);
        } else {
            correctSolution = correctSolution.toString();
        }
        let solutionsArray = this.getSolutions(correctSolution, this.state.solutions);
        return {solution: correctSolution, solutions: solutionsArray, equation: equation}
    }

    getOperators(numbers) {
        let operators = ["+", "-", "*", "/"];
        let chosenOperators = [];
        for(let i=1; i<numbers.length; i++) {
            let operatorPosition = Math.floor(Math.random()*4)
            chosenOperators.push(operators[operatorPosition])
        }
        return chosenOperators;
    }

    getEquation(operators) {
        let equation = '';
        this.state.numbers.forEach((number, i) => {
            if(i === 0) {
                equation = equation + number;
            } else {
                switch(operators[i-1]) {
                    case "+":
                        equation = equation + " + ";
                        break;
                    case "-":
                        equation = equation + " - ";
                        break;
                    case "*":
                        equation = equation + " × ";
                        break;
                    case "/":
                        equation = equation + " ÷ ";
                        break;
                }
                equation = equation + number;
            }
        });
        return equation;
    }

    getResult(numbers, operators) {
        let solution = this.solveByOperatorsPrecedence(operators, numbers);
        return solution;
    }

    solveByOperatorsPrecedence(operators, numbers) {
        let total = 0;
        let precalculatedOperators = operators;
        let precalculatedNumbers = numbers;
        let previousOperationResult = null;
        for(let i=0; i<3; i++) {
            let operator = '';
            switch (i) {
                case 0:
                    operator = ["/"];
                    break;
                case 1:
                    operator = ["*"];
                    break;
                case 2:
                    operator = ["+", "-"];
                break;
            }
            let previousOperatorIndex = null;
            for(let j=0; j<operators.length; j++) {
                if (operator.includes(operators[j])) {
                    let data = {
                        operator: operators[j],
                        operators: precalculatedOperators,
                        numbers: precalculatedNumbers,
                        previousOperationResult: previousOperationResult,
                        previousOperatorIndex: previousOperatorIndex
                    }   
                    let operationData = this.applyOperationByPrecedence(data);
                    precalculatedOperators = operationData.newOperators
                    precalculatedNumbers = operationData.newNumbers
                    previousOperationResult = operationData.operationResult
                    previousOperatorIndex = operationData.operatorIndex
                }
            } 
        }
        if(precalculatedNumbers.length === 1) {
            total = precalculatedNumbers[0];
        }
        return total;
    }

    applyOperationByPrecedence(data) {
        let operatorIndex = 0;
        let operationResult = 0;
        let operator = data.operator
        for (let i=0; i<data.operators.length; i++) {
            let firstNumber = data.numbers[i];
            let secondNumber = data.numbers[i+1];
            operatorIndex = i;
            if (operator === data.operators[i]) {
                if (i === data.previousOperatorIndex) {
                    if (data.previousOperationResult === null) {
                        operationResult = this.applyOperation(firstNumber, secondNumber, data.operator);
                        break;
                    } else {
                        operationResult = this.applyOperation(data.previousOperationResult, secondNumber, data.operator);
                        break;
                    }
                } else {
                    operationResult = this.applyOperation(firstNumber, secondNumber, data.operator);
                    break;
                }
            }
        }

        let newOperators = this.getNewOperators(data.operators, operatorIndex);
        let newNumbers = this.getNewNumbers(data.numbers, operationResult, operatorIndex);
        let newData = {
            newOperators: newOperators,
            newNumbers: newNumbers,
            operationResult: operationResult,
            operatorIndex: operatorIndex
        };

        return newData;
    }

    applyOperation(firstNumber, secondNumber, operator) {
        let result = 0;
        switch (operator) {
            case "+":
                result = this.elementary.addition(firstNumber, secondNumber);
                break;
            case "-":
                result = this.elementary.substraction(firstNumber, secondNumber);
                break;
            case "*":
                result = this.elementary.multiplication(firstNumber, secondNumber);
                break;
            case "/":
                result = this.elementary.division(firstNumber, secondNumber);
                break;
        }
        
        return result;
    }

    getNewOperators(operators, index) {
        let newOperators = new Array();
        for(let i=0; i<operators.length; i++) {
            if(i !== index) {
                newOperators.push(operators[i]);
            }
        }

        return newOperators;
    }

    getNewNumbers(numbers, result, index) {
        let newNumbers = new Array();
        for(let i=0; i<numbers.length; i++) {
            if(i === index) {
                newNumbers.push(result);
            }
            if(i === index || i === index+1) {
                continue;
            } else {
                newNumbers.push(numbers[i]);
            }
        }

        return newNumbers;
    }

    getSolutions(answer, solutions){
        let randomSolutions = [];

        for (let i=0; i<solutions; i++) {
            let randomSolution = this.generateRandomSolutionNumber(randomSolutions, answer);
            randomSolutions.push(randomSolution);
        }

        return randomSolutions;
    }

    generateRandomSolutionNumber(randomSolutions, answer){
        let randomOperation = Math.floor(Math.random()*2);
        let randomSolution = null;
        while (randomSolutions.includes(randomSolution) || answer === randomSolution || randomSolution === null) {
            switch (randomOperation) {
                case 0:
                    if (answer.includes('.')) {
                        randomSolution = this.elementary.addition(parseFloat(answer), Math.random()*3);
                        randomSolution = randomSolution.toFixed(1);
                    } else {
                        randomSolution = this.elementary.addition(parseInt(answer), Math.floor(Math.random()*10));
                        randomSolution = randomSolution.toString();
                    }
                    break;
                case 1:
                    if (answer.includes('.')) {
                        randomSolution = this.elementary.substraction(parseFloat(answer), Math.random()*3);
                        randomSolution = randomSolution.toFixed(1);
                    } else {
                        randomSolution = this.elementary.substraction(parseInt(answer), Math.floor(Math.random()*10));
                        randomSolution = randomSolution.toString();
                    }
                    break;
            }
        }

        return randomSolution;
    }

}
export default EquationSolver;