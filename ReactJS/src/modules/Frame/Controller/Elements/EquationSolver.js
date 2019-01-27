import React, {Component} from React;
import Elementary from "./Operations/Elementary";

class EquationSolver extends Component {
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            equationLength: props.equationLength,
            solutions: props.solutions,
            numbers: props.numbers
        };
    }

    componentWillReceiveProps(nextProps){
        if(nextProps){
            this.setState({
                equationLength: nextProps.equationLength,
                solutions: nextProps.solutions,
                numbers: nextProps.numbers
            });
        }
    }

    solveEquation(){
        let operators = this.getOperators(this.state.numbers);
        let equation = this.getEquation(operators);
        let correctSolution = this.getResult(this.state.numbers, operators);
        let solutionsArray = this.getSolutions(correctSolution, this.state.solutions);
        
        return {solution: correctSolution, solutions: solutionsArray, equation: equation}
    }

    getOperators(numbers) {
        let operators = ["+", "-", "*", "/"];
        let chosenOperators = [];
        for (let i=1; i<numbers.length; i++) {
            let operatorPosition = Math.floor(Math.random()*3)
            chosenOperators.push(operators[operatorPosition])
        }
        return chosenOperators;
    }

    getEquation(operators) {
        let equation = '';
        this.state.numbers.forEach((number, i) => {
            if(i=0) {
                equation += number;
            } else {
                switch (operators[i-1]) {
                    case "+":
                        equation += "+";
                        break;
                    case "-":
                        equation += "-";
                        break;
                    case "*":
                        equation += "×";
                        break;
                    case "/":
                        equation += "÷";
                        break;
                }
                equation += number;
            }
        });
        return equation;
    }

    getResult(numbers, operators) {
        let total = 0;
    }

    getSolutions(solutions){
        let randomSolutions = [];
        if(solutions === 6) {
            
        } else {

        }
    }

}
export default EquationSolver;