import React, { Component } from 'react';

class Elementary extends Component {
    constructor(props){
        super(props);
        this.props = props;
    }

    addition(firstNumber, secondNumber){
        return firstNumber + secondNumber;
    }

    substraction(firstNumber, secondNumber){
        return firstNumber - secondNumber;
    }

    multiplication(firstNumber, secondNumber){
        return firstNumber * secondNumber;
    }

    division(firstNumber, secondNumber){
        return firstNumber / secondNumber;
    }
}
export default Elementary;