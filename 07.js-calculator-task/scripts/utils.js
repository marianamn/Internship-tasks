var utils = function() {
    function sum(a, b) {
        return a + b;
    }

    function substract(a, b) {
        return a - b;
    }

    function multiply(a, b) {
        return a * b;
    }

    function divide(a, b) {
        return a / b;
    }

    function squareRoot(a) {
        return Math.sqrt(a);
    }

    function percent(a, b) {
        return a * b / 100;
    }

    // parse a calculation string into an array of numbers and operators
    function parseCalculationString(expression) {
        expression = expression.replace(/x/g, "*").replace(/÷/g, "/");
        //console.log(expression);

        var calculation = [],
            current = "",
            signs = ["+", "-", "*", "/", "±", "%", "√"];

        for (var i = 0; i < expression.length; i++) {
            //debugger;
            if (signs.indexOf(expression[i]) > -1) {
                if (current === "" && expression[i] === "-") {
                    current = "-";
                } else {
                    calculation.push(parseFloat(current), expression[i]);

                    current = "";
                }
            } else {
                current += expression[i];
            }
        }

        if (current !== "") {
            calculation.push(parseFloat(current));
        }

        return calculation;
    }

    // perform a calculation expressed as an array of operators and numbers
    function calculateExpression(calculation) {

        var newCalculation = [],
            currentOperation;

        var operations = [{
                "*": multiply,
                "/": divide
            },
            {
                "+": sum,
                "-": substract
            }
        ];

        for (var i = 0; i < operations.length; i++) {
            for (var j = 0; j < calculation.length; j++) {
                //debugger;

                if (operations[i][calculation[j]]) {
                    currentOperation = operations[i][calculation[j]];
                } else if (currentOperation) {
                    newCalculation[newCalculation.length - 1] = currentOperation(newCalculation[newCalculation.length - 1], calculation[j]);
                    currentOperation = null;
                } else {
                    newCalculation.push(calculation[j]);
                }
            }

            calculation = newCalculation;
            newCalculation = [];
        }

        if (calculation.length > 1) {
            console.log("Error: unable to resolve calculation");
            return calculation;
        } else {
            return calculation[0];
        }
    }

    return {
        sum: sum,
        substract: substract,
        multiply: multiply,
        divide: divide,
        squareRoot: squareRoot,
        percent: percent,
        parseCalculationString: parseCalculationString,
        calculateExpression: calculateExpression,
    }
}();