/* global  utils memoryButtons validator*/
/* eslint no-console: "off"*/
/* exported calculations */

var calculations = (function() {
    var elementsList,
        inputPanel,
        inputResultString = "",
        expression,
        operators = ["+", "-", "x", "÷", "±", "%", "√"],
        decimalAdded = false,
        result,
        lastOperator,
        lastNumber,
        memoryBtns,
        memoryBtnsArray = [],
        memoryCurrentValue,
        memory = 0;

    function initializeElements() {
        return {
            inputPanel: document.querySelector(".screen"),
            result: document.querySelector(".result"),
            memoryBtns: document.querySelectorAll(".memory")
        }
    }

    elementsList = initializeElements();
    inputPanel = elementsList.inputPanel;
    memoryBtns = elementsList.memoryBtns;

    for (var i = 0; i < memoryBtns.length; i++) {
        memoryBtnsArray[i] = memoryBtns[i].textContent;
    }

    function caclulate(e) {
        e.preventDefault();

        var inputValue,
            btnValue,
            previousBtnClicked;

        inputValue = inputPanel.textContent;
        btnValue = this.textContent;

        if (btnValue === "C") {
            inputResultString = "";

            elementsList.result.textContent = 0;
        }

        if (btnValue === "CE") {
            inputResultString = inputResultString.trim()
            var lastOperatorPosition = inputResultString.lastIndexOf(lastOperator.toString())
            var lastInputNumber = inputResultString.substring(lastOperatorPosition + 1, inputResultString.length);

            inputResultString = inputResultString.substring(0, inputResultString.length - lastInputNumber.length);
            inputPanel.textContent = inputResultString;
        }

        if (memoryBtnsArray.indexOf(btnValue) > -1) {
            if (result) {
                memoryCurrentValue = result;
            } else if (inputResultString.trim().length === 1) {
                memoryCurrentValue = parseFloat(inputResultString);
            } else if (inputResultString && lastOperator) {
                var lastOperatorIndex = inputResultString.lastIndexOf(lastOperator.toString())

                memoryCurrentValue = parseFloat(inputResultString.substring(lastOperatorIndex + 1, inputResultString.length));
            } else {
                memoryCurrentValue = 0;
            }

            memory = memoryButtons.calculate(memory, btnValue, memoryCurrentValue);
            console.log("value: " + memoryCurrentValue);
            console.log("memory: " + memory);
        }

        if (validator.checkIfPressedButtonIsNotInArray(btnValue, ["=", "DEL", "√", "±", "%", "C", "CE"]) && validator.checkIfPressedButtonIsNotInArray(btnValue, memoryBtnsArray)) {
            if (validator.checkIfPressedButtonIsInArray(btnValue, operators)) {
                lastOperator = btnValue;

                previousBtnClicked = inputValue[inputValue.length - 1];

                // only add operator if input is not empty and there is no operator at the end of expression
                // allow minus if the string is empty
                if (inputValue !== "" && (validator.checkIfPressedButtonIsNotInArray(previousBtnClicked, operators) || btnValue === "-")) {
                    inputResultString += btnValue;
                }

                // replace the last operator (if exists) with the newly pressed operator
                if (validator.checkIfPressedButtonIsInArray(previousBtnClicked, operators) && inputValue.length > 1 && btnValue !== "√") {
                    inputResultString = inputValue.replace(/.$/, btnValue);
                }

                decimalAdded = false;
            } else if (btnValue == ".") {
                // prevent more decimals to be added once it"s set. It will be reset when an operator, eval or clear key is pressed.
                if (!decimalAdded) {
                    inputResultString += btnValue;
                    decimalAdded = true;
                }
            } else {
                previousBtnClicked = inputValue[inputValue.length - 1];

                if (previousBtnClicked === "0") {
                    inputResultString = inputResultString.substring(0, inputResultString.length - 1);
                }

                inputResultString += btnValue;
                lastNumber = inputResultString.substring(lastOperatorIndex + 1, inputResultString.length);
            }
        } else if (btnValue === "DEL") {
            inputResultString = inputResultString.substring(0, [inputPanel.textContent.length - 1]);

            if (inputResultString.length === 0) {
                elementsList.result.textContent = 0;
            }
        } else if (btnValue === "√") {
            var lastOperatorIndexSqrt,
                sqrt;

            if (inputResultString.length !== 0 && lastOperator) {
                lastOperatorIndexSqrt = inputResultString.lastIndexOf(lastOperator.toString())

                lastNumber = inputResultString.substring(lastOperatorIndexSqrt + 1, inputResultString.length);
                sqrt = utils.squareRoot(parseFloat(lastNumber));

                inputResultString = inputResultString.replace(new RegExp(lastNumber + '$'), sqrt);
            } else if (inputResultString.length !== 0) {
                sqrt = utils.squareRoot(parseFloat(inputResultString));

                inputResultString = inputResultString.replace(new RegExp(lastNumber + '$'), sqrt);
            } else {
                elementsList.result.textContent = 0;
            }
        } else if (btnValue === "±") {
            var lastOperatorIndexSign;

            if (inputResultString.length !== 0 && lastOperator) {
                lastOperatorIndexSign = inputResultString.lastIndexOf(lastOperator.toString());
                lastNumber = inputResultString.substring(lastOperatorIndexSign + 1, inputResultString.length);
                console.log(lastNumber);

                // if there is expression before, not only the opposite sign number should be put but the previous operator must be removed
                if (lastOperator !== "x" && lastOperator !== "÷") {
                    inputResultString = inputResultString.substring(0, inputResultString.length - lastNumber.length - 1);
                    console.log(inputResultString);

                    if (lastOperator === "-") {
                        inputResultString += "+" + lastNumber;
                        lastOperator = "-";
                    } else {
                        inputResultString += "-" + lastNumber;
                        lastOperator = "+";
                    }
                } else {
                    inputResultString = inputResultString.replace(new RegExp(lastNumber + '$'), lastNumber * (-1));
                }

            } else {
                lastNumber = parseFloat(inputResultString);
                inputResultString = inputResultString.replace(lastNumber, lastNumber * (-1));
            }

        } else if (btnValue === "%") {
            var number,
                lastOperatorIndexPercent,
                stringExpression,
                parsed,
                calculate,
                percent;

            if (lastOperator) {
                lastOperatorIndexPercent = inputResultString.indexOf(lastOperator.toString());
                number = inputResultString.substring(lastOperatorIndexPercent + 1, inputResultString.length);
                stringExpression = inputResultString.substring(0, lastOperatorIndexPercent);

                parsed = utils.parseCalculationString(stringExpression);
                calculate = utils.calculateExpression(parsed);
                percent = utils.percent(calculate, number);

                inputResultString = inputResultString.replace(new RegExp(number + '$'), percent);
            } else {
                number = parseFloat(inputResultString);
                inputResultString = "";
                inputResultString += number / 100;
            }
        } else if (validator.checkIfPressedButtonIsNotInArray(btnValue, memoryBtnsArray) && validator.checkIfPressedButtonIsNotInArray(btnValue, ["C", "CE"])) {
            var lastChar = inputResultString[inputResultString.length - 1],
                square = utils.squareRoot(parseFloat(lastNumber)),
                inputResultStringNew;

            // if last char is operator or decimal remove it
            if ((validator.checkIfPressedButtonIsInArray(lastChar, operators) || lastChar === ".") && lastChar !== "%") {
                inputResultString = inputResultString.replace(/.$/, "");
            }

            inputResultStringNew = inputResultString.replace("√(" + lastNumber + ")", square);

            expression = utils.parseCalculationString(inputResultStringNew);
            result = utils.calculateExpression(expression);

            elementsList.result.textContent = result;
        }

        inputPanel.textContent = inputResultString;
    }

    return {
        calculate: caclulate
    }
}());