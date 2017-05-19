let firstTask,
    secondtask,
    numbers = 20;

let operations = [
    {
        command: 'odd',
        callback: function () {
            let oddNumbers = [];

            for (let i = 1; i <= numbers; i++) {
                if (i % 2 !== 0) {
                    oddNumbers.push(i);
                }
            }

            firstTask = oddNumbers;

            if (secondtask) {
                let ff = getResultedNumbers(firstTask, secondtask);
                pow(ff);
            }
        }
    },
    {
        command: 'even',
        callback: function () {
            let evenNumbers = [];

            for (let i = 1; i <= numbers; i++) {
                if (i % 2 === 0) {
                    evenNumbers.push(i);
                }
            }

            secondtask = evenNumbers;

            if (firstTask) {
                let ff = getResultedNumbers(firstTask, secondtask)
                pow(ff);
            }
        }
    }
];

function getResultedNumbers(firstArray, secondArray) {
    let result = firstArray.concat(secondArray);

    result.sort((a, b) => (a - b));

    return result;
}

function pow(array) {
    let result = array.map((element) => {
        return Math.pow(element, 2);
    });

    console.log(result);
}

function executeTask(command, callback) {
    setTimeout(callback, Math.round(1000 * Math.random()));
}

firstTask = executeTask(operations[0].command, operations[0].callback);
secondtask = executeTask(operations[1].command, operations[1].callback);